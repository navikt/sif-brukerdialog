import { InnsendelseISak, Inntektsmelding, Venteårsak } from '.';
import { Innsendelsestype } from './Innsendelsestype';

export enum Sakshendelser {
    'UKJENT' = 'UKJENT',
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
    'FORVENTET_SVAR' = 'FORVENTET_SVAR',
    'ETTERSENDELSE' = 'ETTERSENDELSE',
    'INNTEKTSMELDING' = 'INNTEKTSMELDING',
}

interface SakshendelseBase {
    type: Sakshendelser;
}

interface SakshendelseMottattSøknad extends SakshendelseBase {
    type: Sakshendelser.MOTTATT_SØKNAD;
    innsendelse: InnsendelseISak;
    /** Mottatt dato */
    dato: Date;
}

interface SakshendelseMottattEttersendelse extends SakshendelseBase {
    type: Sakshendelser.ETTERSENDELSE;
    innsendelse: InnsendelseISak;
    /** Mottatt dato */
    dato: Date;
}

interface SakshendelseAksjonspunkt extends SakshendelseBase {
    type: Sakshendelser.AKSJONSPUNKT;
    venteårsak: Venteårsak;
    /** Tidspunkt satt på vent */
    dato?: Date;
}
export interface SakshendelseForventetSvar extends SakshendelseBase {
    type: Sakshendelser.FORVENTET_SVAR;
    /** saksbehandlingFrist */
    dato?: Date;
    /** Søknad, endringsmelding eller ettersendelse */
    innsendelsestyperIBehandling: Innsendelsestype[];
}
interface SakshendelseFerdigBehandlet extends SakshendelseBase {
    type: Sakshendelser.FERDIG_BEHANDLET;
    /** avsluttet dato */
    dato: Date;
}

interface SakshendelseInntektsmelding extends SakshendelseBase {
    type: Sakshendelser.INNTEKTSMELDING;
    /** avsluttet dato */
    dato: Date;
    inntektsmelding: Inntektsmelding;
    erstatter: Inntektsmelding[];
}

export type Sakshendelse =
    | SakshendelseMottattSøknad
    | SakshendelseAksjonspunkt
    | SakshendelseAksjonspunkt
    | SakshendelseForventetSvar
    | SakshendelseMottattEttersendelse
    | SakshendelseFerdigBehandlet
    | SakshendelseInntektsmelding;
