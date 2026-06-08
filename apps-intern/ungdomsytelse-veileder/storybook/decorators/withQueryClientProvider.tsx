import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const withQueryClientProvider = (Story) => (
    <QueryClientProvider client={queryClient}>
        <Story />
    </QueryClientProvider>
);
