/* eslint-disable no-console */
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const file = await fs.readFile('./mock-data/søknader.json', 'utf8');
        res.status(200).json(JSON.parse(file));
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to load data' });
    }
}

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// import { NextApiResponse, NextApiRequest } from 'next';
// import { Søknad } from '../../types/Søknad';

// export default function handler(_req: NextApiRequest, res: NextApiResponse<Søknad[]>) {
//     return res.status(200).json([
//         {
//             id: '1',
//             type: 'Pleiepenger sykt barn',
//             innsendtDato: new Date(),
//         },
//     ]);
// }
