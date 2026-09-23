import { UngdomsytelseVeilederApp } from '@navikt/sif-app-register';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { initApm } from '@sif/apm';
import MockDate from 'mockdate';
import { createRoot } from 'react-dom/client';

import { demoMockDate } from '../mock/mockConstants';
import { enableMocking } from '../mock/msw/enableMocking';
import App from './App';

void initApm({ app: UngdomsytelseVeilederApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });

export { demoMockDate };

/** Overstyr Date objektet i siden */
if (__IS_VEILEDER_DEMO__) {
    MockDate.set(demoMockDate);
}

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<App />));
