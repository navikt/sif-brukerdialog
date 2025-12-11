import { SøknadContextState } from './SøknadContextState';

export type Mellomlagring = Omit<SøknadContextState, 'søker'>;

export type MellomlagringMetaData = Pick<SøknadContextState, 'søker' | 'registrerteBarn'> & {
    MELLOMLAGRING_VERSJON: string;
};
