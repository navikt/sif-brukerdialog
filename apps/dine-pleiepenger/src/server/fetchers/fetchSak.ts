import { innsyn } from '@sif/k9-sak-innsyn-api';
import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler, prepApiError, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';
import { assertValidSaksnummer } from '../utils/validatePathSegment';
import { SakDtoExtended, zSakDtoExtended } from './sakDtoExtended';

const fjernUkjenteInnsendelserISak = (sak: SakDtoExtended): SakDtoExtended => {
    return {
        ...sak,
        behandlinger: sak.behandlinger.map((behandling) => {
            return {
                ...behandling,
                innsendelser: behandling.innsendelser.filter(
                    (i) => i.innsendelsestype !== innsyn.Innsendelsestype.UKJENT,
                ),
            };
        }),
    };
};

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
    assertValidSaksnummer(saksnummer);

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
            logger.info('Returnerer uparsed data');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.info('Henter sak fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        logger.info('Respons mottatt', { status: response.status });

        if (typeof response.data !== 'object' || response.data === null) {
            const dataStr = typeof response.data === 'string' ? response.data : String(response.data);
            logger.warn('Innsyn - hent sak response.data er ikke objekt', {
                dataType: typeof response.data,
                length: dataStr.length,
                preview: dataStr.slice(0, 10),
                contentType: response.headers?.['content-type'],
                status: response.status,
            });
            throw new Error(`Sak response data er ikke et objekt [typeof=${typeof response.data}]`);
        }

        const parsedData = zSakDtoExtended.parse(response.data);
        logger.info('Sak parset og validert');

        return fjernUkjenteInnsendelserISak(parsedData);
    } catch (error) {
        logger.error('Feil ved henting av sak', prepApiError(error));
        throw error;
    }
};
