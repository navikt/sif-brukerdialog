import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { Søker, SøkerSchema } from '../api-models/SøkerSchema';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

export const fetchSøker = async (req: NextApiRequest, raw?: boolean): Promise<Søker> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9Brukerdialog,
        context,
        'oppslag/soker',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søker from url: ${url}`);
    const response = await axios.get(url, { headers });

    if (serverApiUtils.shouldReturnRawData(raw)) {
        return await response.data;
    }

    logger.info(`Søker fetched`);
    return await SøkerSchema.parse(response.data);
};
