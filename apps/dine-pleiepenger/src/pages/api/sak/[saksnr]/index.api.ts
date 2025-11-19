import { innsyn } from '@navikt/k9-sak-innsyn-api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/fetchers/fetchInntektsmeldinger';
import { fetchSak } from '../../../../server/fetchers/fetchSak';
import { serverApiUtils } from '../../../../server/utils/serverApiUtils';
import { Feature } from '../../../../utils/features';
import { getLogger } from '../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const logger = getLogger(req);
        const { saksnr } = req.query;

        if (!saksnr || typeof saksnr !== 'string') {
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
        }

        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            res.json({
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

        logger.info(`Sak og inntektsmeldinger hentet for saksnummer: ${saksnr}`);
        res.json({ sak, inntektsmeldinger });
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent sak og inntektsmeldinger feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente saksdetaljer' });
    }
}

export default withAuthenticatedApi(handler);
