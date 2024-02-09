import { Aksjonspunkt } from '../server/api-models/AksjonspunktSchema';
import { Behandling } from '../server/api-models/BehandlingSchema';
import { BehandlingStatus } from '../server/api-models/BehandlingStatus';
import { Venteårsak } from '../types/Venteårsak';

enum HendelseType {
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
    'FORVENTET_SVAR' = 'FORVENTET_SVAR',
}

interface Hendelse {
    type: HendelseType;
}

interface SøknadMottattHendelse extends Hendelse {
    type: HendelseType.MOTTATT_SØKNAD;
    dato: Date;
}
interface SøknadAksjonspunktHendelse extends Hendelse {
    type: HendelseType.AKSJONSPUNKT;
    venteårsak: Venteårsak;
}
interface SøknadFerdigBehandletHendelse extends Hendelse {
    type: HendelseType.FERDIG_BEHANDLET;
    dato: Date;
}

interface SøknadForventetSvarHendelse extends Hendelse {
    type: HendelseType.FORVENTET_SVAR;
    saksbehandlingFrist?: Date;
}

export const getHendelserIBehandling = (behandling: Behandling, saksbehandlingFrist?: Date): BehandlingHendelse[] => {
    const { søknader, aksjonspunkter, avsluttetDato, status } = behandling;
    const hendelser: BehandlingHendelse[] = [];

    søknader.forEach((søknad) => {
        hendelser.push({
            type: HendelseType.MOTTATT_SØKNAD,
            dato: søknad.k9FormatSøknad.mottattDato,
        });
    });
    if (aksjonspunkter.length >= 1) {
        hendelser.push({
            type: HendelseType.AKSJONSPUNKT,
            venteårsak: getViktigsteVenteårsakForAksjonspunkter(aksjonspunkter),
        });
    }

    /** Avsluttet eller forventet svar på søknad */
    if (status === BehandlingStatus.AVSLUTTET && avsluttetDato) {
        hendelser.push({
            type: HendelseType.FERDIG_BEHANDLET,
            dato: avsluttetDato,
        });
    } else {
        hendelser.push({
            type: HendelseType.FORVENTET_SVAR,
            saksbehandlingFrist,
        });
    }

    return hendelser;
};

export type BehandlingHendelse =
    | SøknadMottattHendelse
    | SøknadFerdigBehandletHendelse
    | SøknadAksjonspunktHendelse
    | SøknadForventetSvarHendelse;

export const getViktigsteVenteårsakForAksjonspunkter = (aksjonspunkter: Aksjonspunkt[]): Venteårsak => {
    const årsaker = aksjonspunkter.map((a) => a.venteårsak).flat();
    if (årsaker.includes(Venteårsak.MEDISINSK_DOKUMENTASJON)) {
        return Venteårsak.MEDISINSK_DOKUMENTASJON;
    }
    return årsaker[0];
};
