# @navikt/sif-common-query

TanStack Query hooks for SIF applications.

## Usage

```typescript
import { useSøker } from '@navikt/sif-common-query';

function MyComponent() {
    const { data: søker, isLoading, error } = useSøker();
    
    if (isLoading) return <div>Laster...</div>;
    if (error) return <div>Feil: {error.message}</div>;
    
    return <div>Hei {søker.fornavn}!</div>;
}
```

## Available hooks

- `useSøker()` - Hent innlogget bruker
- `useBarn()` - Hent brukerens barn (kommer)
- `useArbeidsgivere()` - Hent brukerens arbeidsgivere (kommer)

## Query client setup

Hooks krever at TanStack Query er satt opp i appen din:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutter
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Din app */}
    </QueryClientProvider>
  );
}
```

## Development

```bash
# Lint
npm run lint:eslint

# Type check
npm run lint:tsc

# Fix linting issues
npm run lint:fix
```
