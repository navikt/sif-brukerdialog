import { ErrorPage, LoadingPage } from './app/pages';
import { Søknad } from './app/Soknad';
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
