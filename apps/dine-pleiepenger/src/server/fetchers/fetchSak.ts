import { innsyn } from '@navikt/k9-sak-innsyn-api';
import { zBehandlingDto, zInnsendelserISakDto, zInnsending } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { z } from 'zod';

import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

export const zSakDtoExtended = innsyn.zSakDto.extend({
    // zSakDto har feil format i forhold til generert skjema; transformeres her
    fagsakYtelseType: z.union([
        innsyn.zSakDto.shape.fagsakYtelseType,
        z
            .object({
                kode: z.string(),
                kodeverk: z.string(),
            })
            .transform((val) => val.kode),
    ]),
    /** Ytelse mangler i generert schema, legger til slik at det ikke strippes ut */
    behandlinger: z.array(
        zBehandlingDto.extend({
            innsendelser: z.array(
                zInnsendelserISakDto.extend({
                    k9FormatInnsendelse: z.optional(
                        zInnsending.extend({
                            ytelse: z.any().optional(),
                        }),
                    ),
                }),
            ),
        }),
    ),
});

const fjernUkjenteInnsendelserISak = (sak: innsyn.SakDto): innsyn.SakDto => {
    return {
        ...sak,
        behandlinger: sak.behandlinger.map((behandling) => {
            return {
                ...behandling,
                innsendelser: filtrerUtUkjentInnsendelse(behandling.innsendelser),
            };
        }),
    };
};

const filtrerUtUkjentInnsendelse = (innsendelser: innsyn.InnsendelserISakDto[]): innsyn.InnsendelserISakDto[] => {
    return innsendelser.filter((i) => (i as any).innsendelsestype !== 'UKJENT');
};

/**
 * Henter detaljer for én spesifikk sak basert på saksnummer
 * @param req
 * @param saksnummer
 * @returns
 */
export const fetchSak = async (req: NextApiRequest, saksnummer: string, unparsed?: boolean): Promise<innsyn.SakDto> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnummer}`,
        'application/json',
    );
    const logger = getLogger(req);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        logger.info(`Unparsed, fetching raw data from ${url}`);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    logger.info(`Fetching sak ${saksnummer} from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    logger.info(`Parser response data`);
    logger.info(`typeof responseDate: ${typeof response.data}`);

    if (typeof response.data !== 'object' || response.data === null) {
        throw new Error(`Sak response data er ikke et objekt eller er null. [typeof=${typeof response.data}]`);
    }
    if (typeof response.data === 'string' && response.data.trim() === '') {
        throw new Error(`Sak response er tom streng`);
    }

    const parsedData = zSakDtoExtended.parse(response.data) as innsyn.SakDto;
    logger.info(`Sak parsed`);

    /** Fjerner innsendelser som har type UKJENT - disse har ingen verdi for bruker */
    return fjernUkjenteInnsendelserISak(parsedData);
};
