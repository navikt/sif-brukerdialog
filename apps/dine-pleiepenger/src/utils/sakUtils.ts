import { Behandling } from '../server/api-models/BehandlingSchema';
import { Sak } from '../types/Sak';
import sortBy from 'lodash.sortby';

const getSisteBehandlingISak = (sak: Sak): Behandling => {
    return sortBy(sak.behandlinger, (b) => b.opprettetDato).reverse()[0];
};

export const getGjeldendeStatusISak = (sak: Sak) => {
    const sisteBehandling = getSisteBehandlingISak(sak);
    return sisteBehandling.status;
};
