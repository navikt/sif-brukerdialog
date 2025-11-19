import { innsyn } from '@navikt/k9-sak-innsyn-api';
import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
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
    const logger = getLogger(req);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        logger.info(`Unparsed, fetching raw data from ${url}`);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    logger.info(`Fetching saksbehandlingstid from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    logger.info(`Parser response data`);
    // saksbehandlingstidUker er definert som bigInt i zod; vi trenger å overstyre den til number
    const parsedData = saksbehandlingstidDtoSchema.parse(response.data) as innsyn.SaksbehandlingtidDto;
    logger.info(`Saksbehandlingstid parsed`);
    return parsedData;
};
