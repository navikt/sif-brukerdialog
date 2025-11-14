import axios from 'axios';
import { NextApiRequest } from 'next';

import { Inntektsmeldinger, InntektsmeldingerSchema } from '../../types/Inntektsmelding';
import { getContextForApiHandler } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogCorrelationID';
import { sorterInntektsmeldingerPåInnsendingstidspunkt } from '../../utils/inntektsmeldingUtils';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';

/**
 * Henter inntektsmeldinger for en sak
 * @param req
 * @param saksnr
 * @param raw
 * @returns
 */
export const fetchInntektsmeldinger = async (
    req: NextApiRequest,
    saksnr: string,
    raw?: boolean,
): Promise<Inntektsmeldinger> => {
    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnr}/inntektsmeldinger`,
        'application/json',
    );
    const logger = getLogger(req);
    logger.info(`Fetching inntektsmeldinger from url: ${url}`);
    const response = await axios.get(url, { headers });
    logger.info(`Inntektsmeldinger fetched`);

    if (serverApiUtils.shouldReturnRawData(raw)) {
        return await response.data;
    }

    return await InntektsmeldingerSchema.parse(response.data).sort(sorterInntektsmeldingerPåInnsendingstidspunkt);
};
