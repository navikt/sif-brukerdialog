import { innsyn } from '@navikt/k9-sak-innsyn-api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/fetchers/fetchInntektsmeldinger';
import { fetchSak } from '../../../../server/fetchers/fetchSak';
import { serverApiUtils } from '../../../../server/utils/serverApiUtils';
import { isValidSaksnummer } from '../../../../server/utils/validatePathSegment';
import { Feature } from '../../../../utils/features';
import { getLogger } from '../../../../utils/getLogger';
import { logApiErrorToSentry } from '../../../../utils/sentryApiErrorLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseLogger = getLogger(req);
    const { saksnr } = req.query;
    const unparsed = req.query.unparsed === 'true';

    if (!isValidSaksnummer(saksnr)) {
        baseLogger.warn('Saksnummer mangler eller er ugyldig', { saksnr });
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
        let sak;
        try {
            sak = await fetchSak(req, saksnr, unparsed);
        } finally {
            sakTimer();
        }

        let inntektsmeldinger: innsyn.SakInntektsmeldingDto[] = [];
        if (Feature.INNTEKTSMELDING_ENABLED) {
            const imTimer = logger.startTimer('fetch-inntektsmeldinger');
            try {
                inntektsmeldinger = await fetchInntektsmeldinger(req, saksnr, unparsed);
            } finally {
                imTimer();
            }
        }

        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            logger.info('Returnerer unparsed data');
            return res.json({ sak, inntektsmeldinger });
        }

        if (!sak) {
            logger.warn('Sak ikke funnet');
            return res.status(404).json({ error: 'Sak ikke funnet' });
        }

        return res.json({ sak, inntektsmeldinger });
    } catch (err) {
        logger.error('Hent saksdetaljer feilet');
        logApiErrorToSentry(err, 'hent-sak');
        return res.status(500).json({ error: 'Kunne ikke hente saksdetaljer' });
    } finally {
        totalTimer();
    }
}

export default withAuthenticatedApi(handler);
