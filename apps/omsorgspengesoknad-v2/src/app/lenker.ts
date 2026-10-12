import { appEnv } from '@app/setup/env/appEnv';
import { createSifLenkeUtils, SifLenkeKey, SifLenker } from '@sif/soknad-ui/lenker';

const getEnvironment = () => (appEnv.ENV === 'dev' ? 'dev' : 'prod');

export const { getLenker, getLenke } = createSifLenkeUtils({
    getEnvironment,
});

export type { SifLenkeKey, SifLenker };

export default getLenker;
