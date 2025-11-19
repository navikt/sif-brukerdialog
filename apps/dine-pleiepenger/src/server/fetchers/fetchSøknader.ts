import axios from 'axios';
import { NextApiRequest } from 'next';

import { innsendteSøknaderSchema, InnsendtSøknad } from '../../types';
import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

export const fetchSøknader = async (req: NextApiRequest, unparsed?: boolean): Promise<InnsendtSøknad[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.sifInnsyn,
        context,
        'soknad',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching søknader from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        return response.data;
    }

    logger.info(`Parser response data`);
    const parsedData = innsendteSøknaderSchema.parse(response.data);
    logger.info(`Søknader parsed`);
    return parsedData;
};
