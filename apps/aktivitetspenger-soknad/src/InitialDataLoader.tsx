import { ErrorPage } from './app/pages/error/ErrorPage';
import { LoadingPage } from './app/pages/loading/LoadingPage';
import { Søknad } from './app/Søknad';
import { useInitialData } from './useInitialData';

export const InitialDataLoader = () => {
    const result = useInitialData();

    switch (result.status) {
        case 'loading':
            return <LoadingPage />;
        case 'error':
            return (
                <ErrorPage
                    error={result.errors.map((e) => (e as Error).message).join(', ') || 'Ukjent feil ved innlasting'}
                />
            );
        case 'success':
            return <Søknad {...result.data} />;
    }
};
