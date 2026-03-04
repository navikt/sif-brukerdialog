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
import { validateSaksnummer } from '../utils/validatePathSegment';

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

export type SakDtoExtended = z.infer<typeof zSakDtoExtended>;

/**
 * Henter detaljer for én spesifikk sak basert på saksnummer
 * @param req
 * @param saksnummer
 * @returns
 */
export const fetchSak = async (
    req: NextApiRequest,
    saksnummer: string,
    unparsed?: boolean,
): Promise<SakDtoExtended> => {
    validateSaksnummer(saksnummer);

    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnummer}`,
        'application/json',
    );
    const logger = getLogger(req).withContext({ operation: 'fetchSak', saksnummer });

    try {
        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.debug('Returnerer uparsed data');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.debug('Henter sak fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        logger.debug('Respons mottatt', { status: response.status });

        if (typeof response.data !== 'object' || response.data === null) {
            throw new Error(`Sak response data er ikke et objekt [typeof=${typeof response.data}]`);
        }

        const parsedData = zSakDtoExtended.parse(response.data) as innsyn.SakDto;
        logger.debug('Sak parset og validert');

        return fjernUkjenteInnsendelserISak(parsedData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.error('Feil ved henting av sak', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                errorCode: error.code,
            });
        } else if (error instanceof z.ZodError) {
            logger.error('Valideringsfeil ved parsing av sak', {
                issues: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
            });
        } else {
            logger.error('Ukjent feil ved henting av sak', {
                errorMessage: error instanceof Error ? error.message : String(error),
            });
        }
        throw error;
    }
};
