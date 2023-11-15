import { Arbeidsgiver } from './Arbeidsgiver';
import { Arbeidsgivere } from './Arbeidsgivere';
import { Dokument } from './Document';

export enum Søknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export enum Søknadstype {
    PP_ETTERSENDING = 'PP_ETTERSENDELSE',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    PP_SYKT_BARN_ENDRINGSMELDING = 'PP_SYKT_BARN_ENDRINGSMELDING',
}

export enum SupportedSøknadstype {
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    PP_SYKT_BARN_ENDRINGSMELDING = 'PP_SYKT_BARN_ENDRINGSMELDING',
}

export interface PleiepengerSøknadInfo {
    søknadstype: Søknadstype.PP_SYKT_BARN;
    arbeidsgivere: Arbeidsgivere | Arbeidsgiver[];
    fraOgMed: Date;
    tilOgMed: Date;
    mottatt: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
}
interface PleiepengerEttersendingInfo {
    søknadstype: Søknadstype.PP_ETTERSENDING;
    beskrivelse: string;
    mottatt: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
}

interface SøknadBase {
    søknadId: string;
    søknadstype: Søknadstype;
    status: Søknadsstatus;
    søknad: PleiepengerSøknadInfo | PleiepengerEttersendingInfo;
    journalpostId: string;
    opprettet: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
    dokumenter: Dokument[];
}
export interface Pleiepengesøknad extends SøknadBase {
    søknadstype: Søknadstype.PP_SYKT_BARN;
    søknad: PleiepengerSøknadInfo;
}
export interface PleiepengerEttersending extends SøknadBase {
    søknadstype: Søknadstype.PP_ETTERSENDING;
    søknad: PleiepengerEttersendingInfo;
}

export interface PleiepengerEndringsmelding extends SøknadBase {
    søknadstype: Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING;
    søknad: PleiepengerSøknadInfo;
}

export type Søknad = Pleiepengesøknad | PleiepengerEttersending | PleiepengerEndringsmelding;

export type SøknadApiResponse = Søknad[];

export const isSøknad = (input: any): input is Søknad => {
    if (input && input.søknadstype && input.status && input.journalpostId) {
        return true;
    } else {
        return false;
    }
};
