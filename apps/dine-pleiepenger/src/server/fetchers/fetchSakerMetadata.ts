import axios from 'axios';
import { NextApiRequest } from 'next';
import { z } from 'zod';

import { getContextForApiHandler, prepApiError, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
import { SakerMetadataDtoModified, zSakerMetadataDtoModified } from '../dto-schemas/sakerMetadataDtoModified';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

/**
 * Henter metadata for saker (uten behandlingsdetaljer)
 * @param req
 * @returns
 */

export const fetchSakerMetadata = async (
    req: NextApiRequest,
    unparsed?: boolean,
): Promise<SakerMetadataDtoModified[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        'saker/metadata',
        'application/json',
    );
    const logger = getLogger(req).withContext({ operation: 'fetchSakerMetadata' });

    try {
        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.info('Henter uparsed sakerMetadata');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.info('Henter sakerMetadata fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        const parsedData = z.array(zSakerMetadataDtoModified).parse(response.data);
        logger.info('SakerMetadata hentet og validert', { antall: parsedData.length });
        return parsedData;
    } catch (error) {
        logger.error('Feil ved henting av sakerMetadata', prepApiError(error));
        throw error;
    }
};
