import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { fetchDocumentStream } from '../../../../server/fetchDocumentStream';
import { getContextForApiHandler } from '../../../../utils/apiUtils';
import { ApiService } from '../../../../server/apiService';

export async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { query } = req;
    const søknadId = query.id as string;
    const organisasjonsnummer = query.organisasjonsnummer as string;

    if (!søknadId) {
        throw Error('SøknadId mangler i query');
    }
    if (!organisasjonsnummer) {
        throw Error('Organisasjonsnummer mangler i query');
    }

    try {
        const data = await fetchDocumentStream(
            `soknad/${søknadId}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`,
            getContextForApiHandler(req),
            ApiService.sifInnsyn,
        );
        data.pipe(res);
    } catch (err) {
        res.status(500).json({ error: 'Kunne ikke hente arbeidsgivermelding', err });
    }
}

export default withAuthenticatedApi(handler);
