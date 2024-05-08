import { Søknad } from '../server/api-models/SøknadSchema';
import { Søknadstype } from '../server/api-models/Søknadstype';
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
    søknad: Søknad;
    /** Mottatt dato */
    dato: Date;
}

interface SøknadshendelseMottattEttersendelse extends SøknadshendelseBase {
    type: SøknadshendelseType.ETTERSENDELSE;
    søknad: Pick<Søknad, 'dokumenter'>;
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
    søknadstyperIBehandling: Array<Søknadstype>;
}
interface SøknadshendelseFerdigBehandlet extends SøknadshendelseBase {
    type: SøknadshendelseType.FERDIG_BEHANDLET;
    /** avsluttet dato */
    dato: Date;
}

interface SøknadshendelseUkjent extends SøknadshendelseBase {
    type: SøknadshendelseType.UKJENT;
    dato: undefined;
}

export type Søknadshendelse =
    | SøknadshendelseUkjent
    | SøknadshendelseMottattSøknad
    | SøknadshendelseAksjonspunkt
    | SøknadshendelseAksjonspunkt
    | SøknadshendelseForventetSvar
    | SøknadshendelseFerdigBehandlet;
