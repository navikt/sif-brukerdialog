import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchSak } from '../../../../server/fetchers/fetchSak';
import { serverApiUtils } from '../../../../server/utils/serverApiUtils';
import { prepApiError } from '../../../../utils/apiUtils';
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

        if (serverApiUtils.shouldAndCanReturnUnparsedData(unparsed)) {
            return res.json(sak);
        }
        return res.json({ nogo: true });
    } catch (err) {
        const logger = getLogger(req);
        logger.error(
            `Hent sak ${Feature.INNTEKTSMELDING_ENABLED ? 'og inntektsmeldinger ' : ''}feilet`,
            prepApiError(err),
        );
        return res.status(500).json({ error: 'Kunne ikke hente saksdetaljer' });
    }
}

export default withAuthenticatedApi(handler);
