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
        aktivitetspenger: 'https://www.nav.no/aktivitetspenger',
        behandlingstider: 'https://www.nav.no/saksbehandlingstider#aktivitetspenger',
    };
};

export default getLenker;
