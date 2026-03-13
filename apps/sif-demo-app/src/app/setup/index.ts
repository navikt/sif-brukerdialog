export * from './AppErrorBoundary';
export * from './AppSanityStatusChecker';
export * from './initApiClients';
export * from './SøknadFormButtons';
export * from './SøknadStep';
export * from './søknadStepConfig';

import { MellomlagringYtelse } from '@navikt/sif-common-query';

export const APP_YTELSE = MellomlagringYtelse.UNGDOMSYTELSE;

export const MELLOMLAGRING_VERSJON = '0.0.1';
