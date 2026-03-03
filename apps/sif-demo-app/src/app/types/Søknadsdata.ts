import { SøknadStepId } from '../config/søknadStepConfig';

export interface Søknadsdata {
    [SøknadStepId.PERSONALIA]?: {
        navn: string;
        harKjæledyr: 'ja' | 'nei';
    };
    [SøknadStepId.KJÆLEDYR]?: {
        navn: string;
    };
    [SøknadStepId.KONTAKT]?: {
        epost: string;
    };
}
