import { Innsendelse } from '../server/api-models/InnsendelseSchema';
import { Innsendelsestype } from '../server/api-models/Innsendelsestype';
import { Venteårsak } from './Venteårsak';

export enum SøknadshendelseType {
    'UKJENT' = 'UKJENT',
    'MOTTATT_SØKNAD' = 'MOTTATT_SØKNAD',
    'AKSJONSPUNKT' = 'AKSJONSPUNKT',
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
    'FORVENTET_SVAR' = 'FORVENTET_SVAR',
    'ETTERSENDELSE' = 'ETTERSENDELSE',
}

interface SøknadshendelseBase {
    type: SøknadshendelseType;
}

interface SøknadshendelseMottattSøknad extends SøknadshendelseBase {
    type: SøknadshendelseType.MOTTATT_SØKNAD;
    innsendelse: Innsendelse;
    /** Mottatt dato */
    dato: Date;
}

interface SøknadshendelseMottattEttersendelse extends SøknadshendelseBase {
    type: SøknadshendelseType.ETTERSENDELSE;
    innsendelse: Pick<Innsendelse, 'dokumenter'>;
    /** Mottatt dato */
    dato: Date;
}

interface SøknadshendelseAksjonspunkt extends SøknadshendelseBase {
    type: SøknadshendelseType.AKSJONSPUNKT;
    venteårsak: Venteårsak;
    /** Tidspunkt satt på vent */
    dato?: Date;
}
export interface SøknadshendelseForventetSvar extends SøknadshendelseBase {
    type: SøknadshendelseType.FORVENTET_SVAR;
    /** saksbehandlingFrist */
    dato?: Date;
    /** Søknad eller endringsmelding */
    søknadstyperIBehandling: Array<Innsendelsestype>;
}
interface SøknadshendelseFerdigBehandlet extends SøknadshendelseBase {
    type: SøknadshendelseType.FERDIG_BEHANDLET;
    /** avsluttet dato */
    dato: Date;
}

export type Søknadshendelse =
    | SøknadshendelseMottattSøknad
    | SøknadshendelseAksjonspunkt
    | SøknadshendelseAksjonspunkt
    | SøknadshendelseForventetSvar
    | SøknadshendelseMottattEttersendelse
    | SøknadshendelseFerdigBehandlet;
