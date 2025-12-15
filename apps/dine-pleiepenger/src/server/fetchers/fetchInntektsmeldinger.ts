import { innsyn } from '@navikt/k9-sak-innsyn-api';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { z } from 'zod';

import { getContextForApiHandler, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';
import { validateSaksnummer } from '../utils/validatePathSegment';

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
    // Validerer saksnummer for å beskytte mot SSRF
    validateSaksnummer(saksnr);

    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnr}/inntektsmeldinger`,
        'application/json',
    );
    const logger = getLogger(req);

    if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
        logger.info(`Unparsed, fetching raw data from ${url}`);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    logger.info(`Fetching inntektsmeldinger`);
    const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
    logger.info(`Response-status from request: ${response.status}`);

    logger.info(`Parser response data`);
    const parsedData = z.array(innsyn.zSakInntektsmeldingDto).parse(response.data) as innsyn.SakInntektsmeldingDto[];
    logger.info(`Inntektsmeldinger parsed`);
    return parsedData;
};
