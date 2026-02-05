import { InnsendelseISak, Inntektsmelding, Venteårsak } from '.';

export enum Sakshendelser {
    'UKJENT' = 'UKJENT',
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
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
}

export type Sakshendelse =
    | SakshendelseMottattSøknad
    | SakshendelseAksjonspunkt
    // | SakshendelseForventetSvar
    | SakshendelseMottattEttersendelse
    | SakshendelseFerdigBehandlet
    | SakshendelseInntektsmelding;
