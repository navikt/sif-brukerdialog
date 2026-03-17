import { innsyn } from '@navikt/k9-sak-innsyn-api';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { z } from 'zod';

import { getContextForApiHandler, prepApiError, serverResponseTransform } from '../../utils/apiUtils';
import { getLogger } from '../../utils/getLogger';
import { ApiServices } from '../types/ApiServices';
import { exchangeTokenAndPrepRequest } from '../utils/exchangeTokenPrepRequest';
import { serverApiUtils } from '../utils/serverApiUtils';
import { assertValidSaksnummer } from '../utils/validatePathSegment';

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
    assertValidSaksnummer(saksnr);

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
            logger.info('Returnerer uparsed data');
            const response = await axios.get(url, { headers });
            return response.data;
        }

        logger.info('Henter inntektsmeldinger fra upstream');
        const response = await axios.get(url, { headers, transformResponse: serverResponseTransform });
        logger.info('Respons mottatt', { status: response.status });

        const parsedData = z
            .array(inntektsmeldingSchemaModified)
            .parse(response.data) as innsyn.SakInntektsmeldingDto[];
        logger.info('Inntektsmeldinger parset', { antall: parsedData.length });

        return parsedData;
    } catch (error) {
        logger.error('Feil ved henting av inntektsmeldinger', prepApiError(error));
        throw error;
    }
};
