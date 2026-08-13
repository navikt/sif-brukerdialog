import { init } from '@nais/apm';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { createRoot } from 'react-dom/client';
import { enableMocking } from '../mock/msw/enableMocking';
import App from './App';

import MockDate from 'mockdate';
import { demoMockDate } from '../mock/mockConstants';

void init({ app: 'ungdomsytelse-veileder', namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });

export { demoMockDate };

/** Overstyr Date objektet i siden */
if (__IS_VEILEDER_DEMO__) {
    MockDate.set(demoMockDate);
}

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<App />));
