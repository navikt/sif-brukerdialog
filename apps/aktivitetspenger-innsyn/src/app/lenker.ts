import { decoratorLocaleUtils } from '@sif/soknad-ui';
import { getSifLenker } from '@sif/soknad-ui/lenker';

import { getAppEnv } from './appEnv';

interface Lenker {
    minSide: string;
    dokumentarkivAktivitetspenger: string;
}

const getEnvironment = () => (getAppEnv().ENV === 'dev' ? 'dev' : 'prod');

const getLenker = (): Lenker => {
    const lenker = getSifLenker(decoratorLocaleUtils.getLocaleFromSessionStorage(), getEnvironment());

    return {
        minSide: lenker.navMinSide,
        dokumentarkivAktivitetspenger: lenker.navDokumentarkivAktivitetspenger,
    };
};

export default getLenker;
