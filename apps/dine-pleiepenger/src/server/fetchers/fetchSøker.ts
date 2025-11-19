import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { SøkerDto, søkerDtoSchema } from '../dto-schemas/søkerDtoSchema';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

export const fetchSøker = async (req: NextApiRequest, unparsed?: boolean): Promise<SøkerDto> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9Brukerdialog,
        context,
        'oppslag/soker',
        'application/json',
    );
    const logger = getLogger(req);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        logger.info(`Unparsed, fetching raw data from ${url}`);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    logger.info(`Fetching søker from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    logger.info(`Parser response data`);
    const parsedData = søkerDtoSchema.parse(response.data);
    logger.info(`Søker parsed`);
    return parsedData;
};
