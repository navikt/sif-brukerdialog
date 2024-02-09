import { Venteårsak } from './Venteårsak';

export enum SøknadshendelseType {
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
    'FORVENTET_SVAR' = 'FORVENTET_SVAR',
}

interface SøknadshendelseBase {
    type: SøknadshendelseType;
}

interface SøknadshendelseMottatt extends SøknadshendelseBase {
    type: SøknadshendelseType.MOTTATT_SØKNAD;
    mottattDato: Date;
}
interface SøknadshendelseAksjonspunkt extends SøknadshendelseBase {
    type: SøknadshendelseType.AKSJONSPUNKT;
    venteårsak: Venteårsak;
}
interface SøknadshendelseForventetSvar extends SøknadshendelseBase {
    type: SøknadshendelseType.FORVENTET_SVAR;
    saksbehandlingFrist?: Date;
}
interface SøknadshendelseFerdigBehandlet extends SøknadshendelseBase {
    type: SøknadshendelseType.FERDIG_BEHANDLET;
    avsluttetDato?: Date;
}

export type Søknadshendelse =
    | SøknadshendelseMottatt
    | SøknadshendelseAksjonspunkt
    | SøknadshendelseAksjonspunkt
    | SøknadshendelseForventetSvar
    | SøknadshendelseFerdigBehandlet;
