import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../../../../auth/withAuthentication';
import { fetchInntektsmeldinger } from '../../../../../server/apiService';
import { getLogger } from '../../../../../utils/getLogCorrelationID';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { saksnr, journalpostId } = req.query;

    try {
        const { inntektsmeldinger } = await fetchInntektsmeldinger(req, saksnr as string);
        const inntektsmelding = inntektsmeldinger.find((im) => im.journalpostId === journalpostId);

        if (!inntektsmelding) {
            return res.status(404).json({ error: 'Inntektsmelding ikke funnet' });
        }

        res.json(inntektsmelding);
    } catch (err) {
        const logger = getLogger(req);
        logger.error(`Hent inntektsmeldinger feilet: ${err}`);
        res.status(500).json({ error: `Kunne ikke hente inntektsmelding #${journalpostId} ` });
    }
}

export default withAuthenticatedApi(handler);
