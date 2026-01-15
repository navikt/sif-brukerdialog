import { innsyn } from '@navikt/k9-sak-innsyn-api';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { z } from 'zod';

import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
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
): Promise<innsyn.SakerMetadataDto[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        'saker/metadata',
        'application/json',
    );
    const logger = getLogger(req);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        logger.info(`Unparsed, fetching raw data from ${url}`);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    logger.info(`Fetching sakerMetadata from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    logger.info(`Parser SakerMetadata response data`);
    const parsedData = z
        .array(
            innsyn.zSakerMetadataDto.extend({
                fagsakYtelseType: z.enum(innsyn.FagsakYtelseType),
            }),
        )
        .parse(response.data);
    logger.info(`SakerMetadata parsed`);
    return parsedData;
};
