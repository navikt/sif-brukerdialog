import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const withQueryClient = (Story) => (
    <QueryClientProvider client={queryClient}>
        <Story />
    </QueryClientProvider>
);
