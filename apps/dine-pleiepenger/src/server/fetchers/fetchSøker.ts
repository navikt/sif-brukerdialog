import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler, prepApiError, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
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
    const logger = getLogger(req).withContext({ operation: 'fetchSøker' });

    try {
        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.info('Henter uparsed søkerdata');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.info('Henter søker fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        const parsedData = søkerDtoSchema.parse(response.data);
        logger.info('Søker hentet og validert');
        return parsedData;
    } catch (error) {
        logger.error('Feil ved henting av søker', prepApiError(error));
        throw error;
    }
};
