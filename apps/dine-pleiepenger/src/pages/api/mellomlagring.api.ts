import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { api } from '../../api';
import { ApiEndpointBrukerdialog } from '../../api/endpoints';
import { Mellomlagring } from '../../types/Mellomlagring';
import { withAuthenticatedApi } from '../../auth/withAuthentication';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const [mellomlagringSøknad, mellomlagringEndring] = await Promise.all([
            api.brukerdialog.get(ApiEndpointBrukerdialog.mellomlagringSøknad).then((res) => res.data),
            api.brukerdialog.get(ApiEndpointBrukerdialog.mellomlagringEndring).then((res) => res.data),
        ]);
        res.status(200).json({
            mellomlagringSøknad,
            mellomlagringEndring,
        });
    } catch (err) {
        res.status(500).json({ error: 'failed to load data for mellomlagring', err });
    }
}

export default withAuthenticatedApi(handler);

export const mellomlagringFecther = async (url: string) => axios.get<Mellomlagring>(url).then((res) => res.data);
