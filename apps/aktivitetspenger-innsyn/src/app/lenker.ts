import { decoratorLocaleUtils } from '@sif/soknad-ui';
import { getSifLenker } from '@sif/soknad-ui/lenker';

import { getAppEnv } from './appEnv';

interface Lenker {
    minSide: string;
    dokumentarkivAktivitetspenger: string;
    aktivitetspenger: string;
    behandlingstider: string;
}

const getEnvironment = () => (getAppEnv().ENV === 'dev' ? 'dev' : 'prod');

const getLenker = (): Lenker => {
    const lenker = getSifLenker(decoratorLocaleUtils.getLocaleFromSessionStorage(), getEnvironment());

    return {
        minSide: lenker.navMinSide,
        dokumentarkivAktivitetspenger: lenker.navDokumentarkivAktivitetspenger,
        aktivitetspenger: getAppEnv().SIF_PUBLIC_URL_AKTIVITETSPENGER,
        behandlingstider: getAppEnv().SIF_PUBLIC_URL_SAKSBEHANDLINGSTIDER,
    };
};

export default getLenker;
