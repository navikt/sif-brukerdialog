import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { enableMocking } from '../../mock/enableMocking';
import App from './App';

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
