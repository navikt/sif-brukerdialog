import { PropsWithChildren, useEffect, useRef } from 'react';

import { useRegistrerteBarn, useSøker, useYtelseMellomlagringService } from '@navikt/sif-common-query';

import { APP_YTELSE } from '../config/appConfig';
import { StegData } from '../config/stegConfig';
import { useSøknadState } from '../hooks';
import { ErrorPage } from '../pages/ErrorPage';
import { LoadingPage } from '../pages/LoadingPage';

export const AppInfoLoader = ({ children }: PropsWithChildren) => {
    const søker = useSøker();
    const barn = useRegistrerteBarn();
    const mellomlagring = useYtelseMellomlagringService(APP_YTELSE);
    const init = useSøknadState((s) => s.init);
    const søknadsdata = useSøknadState((s) => s.søknadsdata);
    const hasInitialized = useRef(false);

    const isLoading = søker.isLoading || barn.isLoading || mellomlagring.isLoading;
    const isError = søker.isError || barn.isError || mellomlagring.isError;

    useEffect(() => {
        if (!hasInitialized.current && søker.data && !isLoading) {
            const mellomlagretStegData = mellomlagring.data?.stegData as StegData | undefined;
            init(søker.data, barn.data ?? [], mellomlagretStegData);
            hasInitialized.current = true;
        }
    }, [søker.data, barn.data, mellomlagring.data, isLoading, init]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (isError) {
        const errorMessages = [søker.error?.message, barn.error?.message, mellomlagring.error?.message].filter(Boolean);
        return <ErrorPage error={errorMessages.join(', ') || 'Ukjent feil ved innlasting'} />;
    }

    if (!søknadsdata) {
        return <LoadingPage />;
    }

    return <>{children}</>;
};
