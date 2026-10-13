import { decoratorLocaleUtils } from '@sif/soknad-ui';
import { getSifLenker, SifLenker } from '@sif/soknad-ui/lenker';

import { getAppEnv } from './setup/appEnv';

interface Lenker extends SifLenker {
    aktivitetspengerInnsyn: string;
    sendBeskjed: string;
}

const getEnvironment = () => (getAppEnv().ENV === 'dev' ? 'dev' : 'prod');

const getLenker = (): Lenker => ({
    ...getSifLenker(decoratorLocaleUtils.getLocaleFromSessionStorage(), getEnvironment()),
    aktivitetspengerInnsyn: getAppEnv().SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL,
    sendBeskjed: getAppEnv().SIF_PUBLIC_SEND_BESKJED,
});

export { getLenker };
export type { SifLenker };

export default getLenker;
