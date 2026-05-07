import { createRoot } from 'react-dom/client';
import { enableMocking } from '../mock/msw/enableMocking';
import App from './App';

import MockDate from 'mockdate';
import { ISODateToDate } from '@navikt/sif-common-utils';

export const demoMockDate = ISODateToDate('2025-12-10');

/** Overstyr Date objektet i siden */
if (__IS_VEILEDER_DEMO__) {
    MockDate.set(demoMockDate);
}

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<App />));
