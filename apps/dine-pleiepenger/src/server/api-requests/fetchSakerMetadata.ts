import { SakerMetadataDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import axios from 'axios';
import { NextApiRequest } from 'next';

import { getContextForApiHandler } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

/**
 * Henter metadata for saker (uten behandlingsdetaljer)
 * @param req
 * @returns
 */
export const fetchSakerMetadata = async (req: NextApiRequest, raw?: boolean): Promise<SakerMetadataDto[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        'saker/metadata',
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching sakerMetadata from url: ${url}`);
    const response = await axios.get(url, { headers });

    if (serverApiUtils.shouldReturnRawData(raw)) {
        return await response.data;
    }

    logger.info(`Response-status from request: ${response.status}`);
    return response.data;
};
