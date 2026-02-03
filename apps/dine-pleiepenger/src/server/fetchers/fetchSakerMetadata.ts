import axios from 'axios';
import { NextApiRequest } from 'next';
import { z } from 'zod';

import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
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
        .array(zSakerMetadataDtoModified)
        .parse(response.data)
        .sort(sortSakerMetadataEtterSisteInnsending);
    logger.info(`SakerMetadata parsed`);
    return parsedData;
};

const sortSakerMetadataEtterSisteInnsending = (a: SakerMetadataDtoModified, b: SakerMetadataDtoModified): number => {
    const dateA = a.sisteInnsendingTidspunkt ? new Date(a.sisteInnsendingTidspunkt).getTime() : 0;
    const dateB = b.sisteInnsendingTidspunkt ? new Date(b.sisteInnsendingTidspunkt).getTime() : 0;
    return dateB - dateA;
};
