/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        await axios('http://localhost:1234/bruker').then((response) => {
            res.status(200).json(response.data);
        });
    } catch (err) {
        res.status(500).json({ error: 'failed to load data', err });
    }
}
