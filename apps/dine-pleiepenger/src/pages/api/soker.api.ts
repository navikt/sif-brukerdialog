import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { api } from '../../api';
import { ApiEndpointBrukerdialog } from '../../api/endpoints';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { Søker } from '../../types/Søker';
import { isForbidden } from '../../utils/apiUtils';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await api.brukerdialog.get(ApiEndpointBrukerdialog.søker);
        res.status(200).json(response.data);
    } catch (err) {
        if (isForbidden(err)) {
            res.status(403).json({ error: 'Bruker har ikke tilgang' });
        }
        res.status(500).json({ error: 'Kunne ikke hente bruker', err });
    }
}

export default withAuthenticatedApi(handler);

export const søkerFecther = async (url: string) => axios.get<Søker>(url).then((res) => res.data);
