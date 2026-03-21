import axios from 'axios';
import { NextApiRequest } from 'next';

import { innsendteSøknaderSchema, InnsendtSøknad } from '../../types';
import { getContextForApiHandler, prepApiError, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
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
    const logger = getLogger(req).withContext({ operation: 'fetchSøknader' });

    try {
        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.info('Henter uparsed søknadsdata');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.info('Henter søknader fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        const parsedData = innsendteSøknaderSchema.parse(response.data);
        logger.info('Søknader hentet og validert', { antall: parsedData.length });
        return parsedData;
    } catch (error) {
        logger.error('Feil ved henting av søknader', prepApiError(error));
        throw error;
    }
};
