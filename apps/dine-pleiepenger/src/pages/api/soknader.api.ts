import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { api } from '../../api';
import { ApiEndpointInnsyn } from '../../api/endpoints';
import { Søknad } from '../../types/Søknad';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await api.innsyn.get(ApiEndpointInnsyn.søknad).then((res) => res.data);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'failed to load data for søknad', err });
    }
}

export const søknaderFecther = async (url: string) => axios.get<Søknad[]>(url).then((res) => res.data);
