import { innsyn } from '@navikt/k9-sak-innsyn-api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/fetchers/fetchInntektsmeldinger';
import { fetchSak } from '../../../../server/fetchers/fetchSak';
import { serverApiUtils } from '../../../../server/utils/serverApiUtils';
import { saksnummerPathValueIsValid } from '../../../../server/utils/validatePathSegment';
import { prepApiError } from '../../../../utils/apiUtils';
import { Feature } from '../../../../utils/features';
import { getLogger } from '../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseLogger = getLogger(req);
    const { saksnr } = req.query;
    const unparsed = req.query.unparsed === 'true';

    if (!saksnummerPathValueIsValid(saksnr)) {
        baseLogger.error('Saksnummer mangler eller er ugyldig', { saksnr });
        return res.status(400).json({ error: 'Saksnummer mangler eller er ugyldig' });
    }

    const logger = baseLogger.withContext({
        saksnummer: saksnr,
        unparsed,
        imEnabled: Feature.INNTEKTSMELDING_ENABLED,
    });

    const totalTimer = logger.startTimer('hent-sak-detaljer');

    try {
        logger.info('Starter henting av saksdetaljer');

        const sakTimer = logger.startTimer('fetch-sak');
        const sak = await fetchSak(req, saksnr, unparsed);
        sakTimer();

        let inntektsmeldinger: innsyn.SakInntektsmeldingDto[] = [];
        if (Feature.INNTEKTSMELDING_ENABLED) {
            const imTimer = logger.startTimer('fetch-inntektsmeldinger');
            inntektsmeldinger = await fetchInntektsmeldinger(req, saksnr, unparsed);
            imTimer();
        }

        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.debug('Returnerer unparsed data');
            return res.json({ sak, inntektsmeldinger });
        }

        if (!sak) {
            logger.warn('Sak ikke funnet');
            return res.status(404).json({ error: 'Sak ikke funnet' });
        }

        totalTimer();
        return res.json({ sak, inntektsmeldinger });
    } catch (err) {
        const errorDetails = prepApiError(err);
        logger.error('Henting av saksdetaljer feilet', {
            errorDetails,
            errorType: err instanceof Error ? err.constructor.name : typeof err,
        });
        return res.status(500).json({ error: 'Kunne ikke hente saksdetaljer' });
    }
}

export default withAuthenticatedApi(handler);
