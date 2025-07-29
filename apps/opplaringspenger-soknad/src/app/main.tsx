import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { enableMocking } from '../../mock/msw/enableMocking';

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
