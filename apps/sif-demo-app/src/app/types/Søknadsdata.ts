import { SøknadStepId } from '../config/søknadStepConfig';

export type PersonaliaSøknadsdata = {
    navn: string;
    harHobby: 'ja' | 'nei';
};

export type HobbySøknadsdata = {
    navn: string;
};

export type KontaktSøknadsdata = {
    epost: string;
};

export interface Søknadsdata {
    [SøknadStepId.PERSONALIA]?: PersonaliaSøknadsdata;
    [SøknadStepId.HOBBY]?: HobbySøknadsdata;
    [SøknadStepId.KONTAKT]?: KontaktSøknadsdata;
}
