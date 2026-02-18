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
    try {
        const logger = getLogger(req);
        const { saksnr } = req.query;

        if (!saksnummerPathValueIsValid(saksnr)) {
            logger.error(`Saksnummer mangler eller er ugyldig`);
            return res.status(400).json({ error: 'Saksnummer mangler eller er ugyldig' });
        }

        logger.info(`Henter saksdetaljer for saksnummer: ${saksnr}`);

        const unparsed = req.query.unparsed === 'true';
        const sak = await fetchSak(req, saksnr, unparsed);

        // Hent inntektsmeldinger hvis feature er aktivert
        let inntektsmeldinger: innsyn.SakInntektsmeldingDto[] = [];
        if (Feature.INNTEKTSMELDING_ENABLED) {
            inntektsmeldinger = await fetchInntektsmeldinger(req, saksnr, unparsed);
        } else {
            logger.info(
                `Henter ikke inntektsmeldinger. Feature.INNTEKTSMELDING_ENABLED=${Feature.INNTEKTSMELDING_ENABLED}`,
            );
        }

        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            return res.json({
                sak,
                inntektsmeldinger,
            });
        }

        if (!sak) {
            logger.warn(`Sak ${saksnr} ikke funnet`);
            return res.status(404).json({ error: 'Sak ikke funnet' });
        }
        if (!inntektsmeldinger) {
            logger.warn(`Inntektsmeldinger for sak ${saksnr} ikke funnet`);
            return res.status(404).json({ error: 'Inntektsmeldinger ikke funnet' });
        }

        // Suksess
        if (Feature.INNTEKTSMELDING_ENABLED) {
            logger.info(`Sak og inntektsmeldinger hentet for saksnummer: ${saksnr}`);
        } else {
            logger.info(`Sak hentet for saksnummer: ${saksnr}`);
        }
        return res.json({ sak, inntektsmeldinger });
    } catch (err) {
        const logger = getLogger(req);
        if (Feature.INNTEKTSMELDING_ENABLED) {
            logger.error(`Hent sak feilet`, prepApiError(err));
        } else {
            logger.error(`Hent sak og inntektsmeldinger feilet`, prepApiError(err));
        }
        return res.status(500).json({ error: 'Kunne ikke hente saksdetaljer' });
    }
}

export default withAuthenticatedApi(handler);
