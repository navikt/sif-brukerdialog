export * from './api/initApiClients';
export * from './context/søknadContext';
export * from './env/appEnv';
export * from './søknad/SøknadFormButtons';
export * from './søknad/SøknadStep';
export * from './søknad/søknadStepConfig';
export * from './wrappers/AppErrorBoundary';
export * from './wrappers/AppSanityStatusChecker';

import { MellomlagringYtelse } from '@navikt/sif-common-query';

export const APP_YTELSE = MellomlagringYtelse.UNGDOMSYTELSE;

export const MELLOMLAGRING_VERSJON = '0.0.1';
