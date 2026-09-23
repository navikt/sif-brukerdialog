import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { getMaybeEnv } from '@navikt/sif-common-env';
import { initApm } from '@sif/apm';
import MockDate from 'mockdate';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '../../mock/msw/enableMocking';
import App from './App';

void initApm({ app: EndringsmeldingPsbApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });

if (import.meta.env.INJECT_DECORATOR) {
    injectDecoratorClientSide({
        env: 'dev',
        params: {
            simple: true,
            chatbot: false,
        },
    });
}

enableMocking().then(() => {
    const envNow = getMaybeEnv('NOW');
    if (envNow) {
        MockDate.set(new Date(envNow));
    }

    createRoot(document.getElementById('root')!).render(<App />);
});
