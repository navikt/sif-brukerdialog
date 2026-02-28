import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/sif-demo">
                <Routes>
                    <Route path="/" element={<div>SIF Demo App</div>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
