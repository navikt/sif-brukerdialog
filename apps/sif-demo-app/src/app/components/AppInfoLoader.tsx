import { PropsWithChildren, useEffect, useRef } from 'react';

import {
    MellomlagringYtelse,
    useRegistrerteBarn,
    useSøker,
    useYtelseMellomlagringService,
} from '@navikt/sif-common-query';

import { useSøknadState } from '../hooks';
import { ErrorPage } from '../pages/ErrorPage';
import { LoadingPage } from '../pages/LoadingPage';

export const AppInfoLoader = ({ children }: PropsWithChildren) => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const mellomlagring = useYtelseMellomlagringService(MellomlagringYtelse.AKTIVITETSPENGER);
    const init = useSøknadState((s) => s.init);
    const søknadsdata = useSøknadState((s) => s.søknadsdata);
    const hasInitialized = useRef(false);

    const isLoading = søker.isLoading || registrerteBarn.isLoading || mellomlagring.isLoading;
    const isError = søker.isError || registrerteBarn.isError || mellomlagring.isError;

    useEffect(() => {
        if (!hasInitialized.current && søker.data && !isLoading) {
            init(søker.data, registrerteBarn.data || [], mellomlagring.data);
            hasInitialized.current = true;
        }
    }, [søker.data, registrerteBarn.data, mellomlagring.data, isLoading, init]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (isError) {
        const errorMessages = [
            søker.error?.message,
            registrerteBarn.error?.message,
            mellomlagring.error?.message,
        ].filter(Boolean);
        return <ErrorPage error={errorMessages.join(', ') || 'Ukjent feil ved innlasting'} />;
    }

    if (!søknadsdata) {
        return <LoadingPage />;
    }

    return <>{children}</>;
};
