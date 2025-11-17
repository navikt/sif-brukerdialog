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
 * Henter inntektsmeldinger for en sak
 * @param req
 * @param saksnr
 * @param unparsed
 * @returns
 */
export const fetchInntektsmeldinger = async (
    req: NextApiRequest,
    saksnr: string,
    unparsed?: boolean,
): Promise<innsyn.SakInntektsmeldingDto[]> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnr}/inntektsmeldinger`,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching inntektsmeldinger from url: ${url}`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        return response.data;
    }

    logger.info(`Parser response data`);
    const parsedData = z.array(innsyn.zSakInntektsmeldingDto).parse(response.data) as innsyn.SakInntektsmeldingDto[];
    logger.info(`Inntektsmeldinger parsed`);
    return parsedData;
};
