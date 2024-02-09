import { Behandling } from '../server/api-models/BehandlingSchema';
import { BehandlingStatus } from '../server/api-models/BehandlingStatus';
import { Sak } from '../types/Sak';
import sortBy from 'lodash.sortby';
import { Venteårsak } from '../types/Venteårsak';

const getSisteBehandlingISak = (sak: Sak): Behandling => {
    return sortBy(sak.behandlinger, (b) => b.opprettetDato).reverse()[0];
};

const sortBehandlinger = (behandlinger: Behandling[]): Behandling[] => {
    return sortBy(behandlinger, (b) => b.opprettetDato).reverse();
};

export const getBehandlingerISakSorted = (sak: Sak): Behandling[] => {
    return sortBehandlinger(sak.behandlinger);
};

export const getGjeldendeStatusISak = (sak: Sak): { status: BehandlingStatus; venteårsak?: Venteårsak } => {
    const behandling = getSisteBehandlingISak(sak);
    return {
        status: behandling.status,
        venteårsak: behandling.aksjonspunkter[0]?.venteårsak,
    };
};
