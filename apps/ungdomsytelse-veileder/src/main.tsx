import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={'/'}>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
