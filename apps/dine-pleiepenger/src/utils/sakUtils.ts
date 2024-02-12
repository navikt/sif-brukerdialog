import sortBy from 'lodash.sortby';
import { Aksjonspunkt } from '../server/api-models/AksjonspunktSchema';
import { Behandling } from '../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../server/api-models/Behandlingsstatus';
import { Sak } from '../types/Sak';
import { Søknadshendelse, SøknadshendelseType } from '../types/Søknadshendelse';
import { Venteårsak } from '../types/Venteårsak';
import { Søknad } from '../server/api-models/SøknadSchema';
import { BehandlingsstatusISak } from '../types/BehandlingsstatusISak';

const getSisteBehandlingISak = (sak: Sak): Behandling => {
    return sortBy(sak.behandlinger, (b) => b.opprettetDato).reverse()[0];
};

export const sortBehandlinger = (behandlinger: Behandling[], doSortSøknader: boolean = true): Behandling[] => {
    const sortedBehandlinger = sortBy(behandlinger, (b) => b.opprettetDato).reverse();
    if (doSortSøknader) {
        return sortedBehandlinger.map((b): Behandling => {
            return {
                ...b,
                søknader: sortSøknader(b.søknader),
            };
        });
    }
    return sortedBehandlinger;
};

export const sortSøknader = (søknader: Søknad[]): Søknad[] => {
    return sortBy(søknader, ({ k9FormatSøknad }: Søknad) => k9FormatSøknad.mottattDato.getTime()).reverse();
};

export const getBehandlingerISakSorted = (sak: Sak): Behandling[] => {
    return sortBehandlinger(sak.behandlinger);
};

export const getBehandlingsstatusISak = (sak: Sak): BehandlingsstatusISak => {
    const behandling = getSisteBehandlingISak(sak);
    return {
        status: behandling.status,
        venteårsak: behandling.aksjonspunkter[0]?.venteårsak,
    };
};

export const getHendelserIBehandling = (behandling: Behandling, saksbehandlingFrist?: Date): Søknadshendelse[] => {
    const { søknader, aksjonspunkter, avsluttetDato, status } = behandling;
    const hendelser: Søknadshendelse[] = [];

    søknader.forEach((søknad) => {
        hendelser.push({
            type: SøknadshendelseType.MOTTATT_SØKNAD,
            mottattDato: søknad.k9FormatSøknad.mottattDato,
        });
    });
    if (aksjonspunkter.length >= 1) {
        hendelser.push({
            type: SøknadshendelseType.AKSJONSPUNKT,
            venteårsak: getViktigsteVenteårsakForAksjonspunkter(aksjonspunkter),
        });
    }

    /** Avsluttet eller forventet svar på søknad */
    if (status === Behandlingsstatus.AVSLUTTET && avsluttetDato) {
        hendelser.push({
            type: SøknadshendelseType.FERDIG_BEHANDLET,
            avsluttetDato: avsluttetDato,
        });
    } else {
        hendelser.push({
            type: SøknadshendelseType.FORVENTET_SVAR,
            saksbehandlingFrist,
        });
    }

    return hendelser;
};

export const getViktigsteVenteårsakForAksjonspunkter = (aksjonspunkter: Aksjonspunkt[]): Venteårsak => {
    const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
    if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
        return Venteårsak.MEDISINSK_DOKUMENTASJON;
    }
    return årsaker[0];
};
