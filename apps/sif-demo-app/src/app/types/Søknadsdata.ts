import { SøknadStepId } from '../config/søknadStepConfig';

export type PersonaliaSøknadsdata = {
    navn: string;
    harKjæledyr: 'ja' | 'nei';
};

export type KjæledyrSøknadsdata = {
    navn: string;
};

export type KontaktSøknadsdata = {
    epost: string;
};

export interface Søknadsdata {
    [SøknadStepId.PERSONALIA]?: PersonaliaSøknadsdata;
    [SøknadStepId.KJÆLEDYR]?: KjæledyrSøknadsdata;
    [SøknadStepId.KONTAKT]?: KontaktSøknadsdata;
}
