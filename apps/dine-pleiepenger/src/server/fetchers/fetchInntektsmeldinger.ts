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

const inntektsmeldingSchemaModified = innsyn.zSakInntektsmeldingDto.omit({ utsettelsePerioder: true });

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
    validateSaksnummer(saksnr);

    const context = getContextForApiHandler(req);
    const { url, headers } = await exchangeTokenAndPrepRequest(
        ApiServices.k9SakInnsyn,
        context,
        `sak/${saksnr}/inntektsmeldinger`,
        'application/json',
    );
    const logger = getLogger(req).withContext({ operation: 'fetchInntektsmeldinger', saksnummer: saksnr });

    try {
        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.debug('Returnerer uparsed data');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.debug('Henter inntektsmeldinger fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        logger.debug('Respons mottatt', { status: response.status });

        const parsedData = z
            .array(inntektsmeldingSchemaModified)
            .parse(response.data) as innsyn.SakInntektsmeldingDto[];
        logger.debug('Inntektsmeldinger parset', { antall: parsedData.length });

        return parsedData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.error('Feil ved henting av inntektsmeldinger', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                errorCode: error.code,
            });
        } else if (error instanceof z.ZodError) {
            logger.error('Valideringsfeil ved parsing av inntektsmeldinger', {
                issues: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
            });
        } else {
            logger.error('Ukjent feil ved henting av inntektsmeldinger', {
                errorMessage: error instanceof Error ? error.message : String(error),
            });
        }
        throw error;
    }
};
