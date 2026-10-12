import { decoratorLocaleUtils } from '@sif/soknad-ui';
import { getSifLenker, SifLenker } from '@sif/soknad-ui/lenker';

import { getAppEnv } from './setup/env/appEnv';

const getEnvironment = () => (getAppEnv().ENV === 'dev' ? 'dev' : 'prod');

const getLenker = (): SifLenker => ({
    ...getSifLenker(decoratorLocaleUtils.getLocaleFromSessionStorage(), getEnvironment()),
});

export { getLenker };
export type { SifLenker };
