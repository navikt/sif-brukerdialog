import '@navikt/ds-css';

import { Theme } from '@navikt/ds-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Fant ikke rot-elementet #root');
}

createRoot(rootElement).render(
    <StrictMode>
        <Theme theme="light">
            <App />
        </Theme>
    </StrictMode>,
);
