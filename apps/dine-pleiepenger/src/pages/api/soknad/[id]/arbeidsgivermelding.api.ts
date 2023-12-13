import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../../../auth/withAuthentication';
import { getContextForApiHandler } from '../../../../utils/apiUtils';
import { ApiService } from '../../../../server/apiService';
import { fetchDocument } from '../../../../server/fetchDocument';

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
        const path = `soknad/${søknadId}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
        const blob = await fetchDocument(path, getContextForApiHandler(req), ApiService.sifInnsyn);
        const resBufferArray = await blob.arrayBuffer();
        const resBuffer = Buffer.from(resBufferArray);
        res.setHeader('Content-Type', 'application/PDF');
        res.setHeader('Content-Length', (blob as Blob).size.toString());

        const dokumentTittel = `Arbeidsgivermelding - org. ${organisasjonsnummer}`;
        res.setHeader('Content-Disposition', `filename="${dokumentTittel}"`);
        res.write(resBuffer, 'binary');
        res.end();
    } catch (err) {
        res.status(500).json({ error: 'Kunne ikke hente arbeidsgivermelding', err });
    }
}

export default withAuthenticatedApi(handler);
