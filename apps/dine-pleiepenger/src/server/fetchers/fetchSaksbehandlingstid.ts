import { innsyn } from '@navikt/k9-sak-innsyn-api';
import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler, prepApiError, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

export const saksbehandlingstidDtoSchema = innsyn.zSaksbehandlingtidDto.transform((data) => ({
    saksbehandlingstidUker: Number(data.saksbehandlingstidUker),
}));
/**
 * Henter forventet behandlingstid for søknad på nåværende tidspunkt
 * @param req
 * @returns
 */
export const fetchSaksbehandlingstid = async (
    req: NextApiRequest,
    unparsed?: boolean,
): Promise<innsyn.SaksbehandlingtidDto> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        'saker/saksbehandlingstid',
        'application/json',
    );
    const logger = getLogger(req).withContext({ operation: 'fetchSaksbehandlingstid' });

    try {
        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.info('Henter uparsed saksbehandlingstid');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.info('Henter saksbehandlingstid fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        // saksbehandlingstidUker er definert som bigInt i zod; vi trenger å overstyre den til number
        const parsedData = saksbehandlingstidDtoSchema.parse(response.data) as innsyn.SaksbehandlingtidDto;
        logger.info('Saksbehandlingstid hentet og validert');
        return parsedData;
    } catch (error) {
        logger.error('Feil ved henting av saksbehandlingstid', prepApiError(error));
        throw error;
    }
};
