import axios from 'axios';
import { NextApiRequest } from 'next';

import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import { getContextForApiHandler } from '../../utils/apiUtils';
import { getServerEnv } from '../../utils/env';
import { getLogger } from '../../utils/getLogCorrelationID';
import { InnsendtSøknaderSchema } from '../api-models/InnsendtSøknadSchema';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';

const shouldReturnRawData = (raw?: boolean): boolean => {
    return raw === true && getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT !== 'production';
};

export const fetchSøknader = async (req: NextApiRequest, raw?: boolean): Promise<InnsendtSøknad[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.sifInnsyn,
        context,
        'soknad',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søknader from url: ${url}`);
    const response = await axios.get(url, { headers });

    if (shouldReturnRawData(raw)) {
        return await response.data;
    }

    logger.info(`Søknader fetched; parser response data`);
    const parsedData = await InnsendtSøknaderSchema.parse(response.data);
    logger.info(`Søknader parsed`);
    return await parsedData;
};
