import { ErrorPage, LoadingPage } from '@sif/soknad-ui';

import { useAppIntl } from './app/i18n';
import { Innsyn } from './app/Innsyn';
import { useInitialData } from './useInitialData';

export const InitialDataLoader = () => {
    const result = useInitialData();
    const { text } = useAppIntl();

    switch (result.status) {
        case 'loading':
            return <LoadingPage applicationTitle={text('application.title')} />;
        case 'error':
            if (import.meta.env.MODE === 'development') {
                // eslint-disable-next-line no-console
                console.error(
                    result.errors.map((e) => (e as Error).message).join(', ') || 'Ukjent feil ved innlasting',
                );
            }
            return <ErrorPage applicationTitle={text('application.title')} />;
        case 'success':
            return <Innsyn {...result.data} />;
    }
};
