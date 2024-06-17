import { Innsendelse } from '../server/api-models/InnsendelseSchema';
import { Innsendelsestype } from '../server/api-models/Innsendelsestype';
import { Venteårsak } from './Venteårsak';

export enum Sakshendelser {
    'UKJENT' = 'UKJENT',
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
    'FORVENTET_SVAR' = 'FORVENTET_SVAR',
    'ETTERSENDELSE' = 'ETTERSENDELSE',
}

interface SakshendelseBase {
    type: Sakshendelser;
}

interface SakshendelseMottattSøknad extends SakshendelseBase {
    type: Sakshendelser.MOTTATT_SØKNAD;
    innsendelse: Innsendelse;
    /** Mottatt dato */
    dato: Date;
}

interface SakshendelseMottattEttersendelse extends SakshendelseBase {
    type: Sakshendelser.ETTERSENDELSE;
    innsendelse: Innsendelse;
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
    søknadstyperIBehandling: Array<Innsendelsestype>;
}
interface SakshendelseFerdigBehandlet extends SakshendelseBase {
    type: Sakshendelser.FERDIG_BEHANDLET;
    /** avsluttet dato */
    dato: Date;
}

export type Sakshendelse =
    | SakshendelseMottattSøknad
    | SakshendelseAksjonspunkt
    | SakshendelseAksjonspunkt
    | SakshendelseForventetSvar
    | SakshendelseMottattEttersendelse
    | SakshendelseFerdigBehandlet;
