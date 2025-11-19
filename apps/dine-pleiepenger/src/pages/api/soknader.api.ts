import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { fetchSøknader } from '../../server/fetchers/fetchSøknader';
import { InnsendtSøknad } from '../../types';
import { getLogger } from '../../utils/getLogCorrelationID';

const opprettetSisteTreDager = (søknad: InnsendtSøknad): boolean => {
    return dayjs(søknad.opprettet).isAfter(dayjs().subtract(3, 'days'));
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const unparsed = req.query.unparsed === 'true';
        const nyeste = req.query.nyeste === 'true';

        const response = await fetchSøknader(req, unparsed);

        if (nyeste && response.length > 0) {
            // Returner kun nylig opprettet
            return res.send(response.filter(opprettetSisteTreDager));
        } else {
            // Returner alle
            return res.send(response);
        }
    } catch (err) {
        getLogger(req).error(`Hent søknader feilet: ${err}`);
        return res.status(500).json({ error: 'Kunne ikke hente søknader' });
    }
}

export default withAuthenticatedApi(handler);
