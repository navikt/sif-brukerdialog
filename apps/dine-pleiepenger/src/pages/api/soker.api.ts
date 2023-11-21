import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { api } from '../../api';
import { ApiEndpointBrukerdialog } from '../../api/endpoints';
import { Søker } from '../../types/Søker';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await api.brukerdialog.get(ApiEndpointBrukerdialog.søker).then((res) => res.data);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'failed to load data for søker', err });
    }
}

export const søkerFecther = async (url: string) => axios.get<Søker>(url).then((res) => res.data);
