import { createRoot } from 'react-dom/client';
import { enableMocking } from '../mock/msw/mocking';
import App from './App';

enableMocking().then(() => createRoot(document.getElementById('root')!).render(<App />));
