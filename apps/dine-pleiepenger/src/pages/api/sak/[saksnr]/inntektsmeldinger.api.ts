import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../server/fetchers/fetchInntektsmeldinger';
import { isValidSaksnummer } from '../../../../server/utils/validatePathSegment';
import { getLogger } from '../../../../utils/getLogger';
import { logApiErrorToSentry } from '../../../../utils/sentryApiErrorLogger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { saksnr } = req.query;

        if (!isValidSaksnummer(saksnr)) {
            const logger = getLogger(req);
            logger.warn('Ugyldig saksnummer i forespørsel', { saksnr });
            return res.status(400).json({ error: 'Saksnummer mangler eller er ugyldig' });
        }

        const unparsed = req.query.unparsed === 'true';
        const data = await fetchInntektsmeldinger(req, saksnr, unparsed);
        return res.send(data);
    } catch (err) {
        getLogger(req).error('Hent inntektsmeldinger feilet');
        logApiErrorToSentry(err, 'inntektsmeldinger');
        return res.status(500).json({ error: `Kunne ikke hente inntektsmeldinger` });
    }
}

export default withAuthenticatedApi(handler);
