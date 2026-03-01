import { PropsWithChildren, useEffect, useRef } from 'react';

import { useSøker } from '@navikt/sif-common-query';

import { useSøknadState } from '../hooks';
import { ErrorPage } from '../pages/ErrorPage';
import { LoadingPage } from '../pages/LoadingPage';

export const AppInfoLoader = ({ children }: PropsWithChildren) => {
    const søker = useSøker();
    const init = useSøknadState((s) => s.init);
    const søknadsdata = useSøknadState((s) => s.søknadsdata);
    const hasInitialized = useRef(false);

    const isLoading = søker.isLoading;
    const isError = søker.isError;

    useEffect(() => {
        if (!hasInitialized.current && søker.data && !isLoading) {
            init(søker.data, [], undefined);
            hasInitialized.current = true;
        }
    }, [søker.data, isLoading, init]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (isError) {
        const errorMessages = [søker.error?.message].filter(Boolean);
        return <ErrorPage error={errorMessages.join(', ') || 'Ukjent feil ved innlasting'} />;
    }

    if (!søknadsdata) {
        return <LoadingPage />;
    }

    return <>{children}</>;
};
