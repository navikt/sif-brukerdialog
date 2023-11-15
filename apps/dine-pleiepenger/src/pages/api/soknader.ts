import type { NextApiRequest, NextApiResponse } from 'next';
import { endpoints } from '../../utils/apiUtils';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch(endpoints.søknader);
        res.status(200).json(await response.json());
    } catch (err) {
        res.status(500).json({ error: 'failed to load data', err });
    }
}
