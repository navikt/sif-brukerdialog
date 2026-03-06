import { SøknadContextType } from '../søknad/types';

export type Mellomlagring = Pick<SøknadContextType, 'søknadsdata'>;

export type MellomlagringMetaData = Pick<SøknadContextType, 'søker' | 'registrerteBarn'> & {
    MELLOMLAGRING_VERSJON: string;
};
