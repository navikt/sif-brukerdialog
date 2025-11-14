import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { Saksbehandlingstid, SaksbehandlingstidSchema } from '../api-models/SaksbehandlingstidSchema';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

/**
 * Henter forventet behandlingstid for søknad på nåværende tidspunkt
 * @param req
 * @returns
 */
export const fetchSaksbehandlingstid = async (req: NextApiRequest, raw?: boolean): Promise<Saksbehandlingstid> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        'saker/saksbehandlingstid',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching behandlingstid from url: ${url}`);
    const response = await axios.get(url, { headers });

    if (serverApiUtils.shouldReturnRawData(raw)) {
        return await response.data;
    }

    logger.info(`Behandlingstid fetched`);
    return await SaksbehandlingstidSchema.parse(response.data);
};
