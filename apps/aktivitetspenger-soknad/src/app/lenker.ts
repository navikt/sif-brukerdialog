import { createSifLenkeUtils, SifLenkeKey, SifLenker } from '@sif/soknad-ui/lenker';

import { getAppEnv } from './setup/appEnv';

const getEnvironment = () => (getAppEnv().ENV === 'dev' ? 'dev' : 'prod');
// const lenker = getSifLenker(getLocaleFromSessionStorage(), getEnvironment());
export const { getLenker, getLenke, useLenker } = createSifLenkeUtils({
    getEnvironment,
});

export type { SifLenkeKey, SifLenker };

export default getLenker;
