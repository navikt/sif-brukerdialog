import { useRegistrerteBarn, useSøker, useYtelseMellomlagring } from '@navikt/sif-common-query';
import { useMemo } from 'react';

import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../../config/appConfig';
import { ErrorPage, LoadingPage } from '../../pages';
import { Søknad } from '../../Søknad';
import { MellomlagringMetaData, SøknadMellomlagring } from '../../types/Mellomlagring';

export const AppInfoLoader = () => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();

    const metadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!søker.isFetched || !registrerteBarn.isFetched || !søker.data || !registrerteBarn.data) return undefined;
        return {
            MELLOMLAGRING_VERSJON,
            søker: søker.data,
            barn: registrerteBarn.data,
        };
    }, [søker.isFetched, registrerteBarn.isFetched, søker.data, registrerteBarn.data]);

    const mellomlagring = useYtelseMellomlagring<SøknadMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

    const isLoading = søker.isLoading || registrerteBarn.isLoading || (!!søker.data && !mellomlagring.isFetched);
    const isError = søker.isError || registrerteBarn.isError || mellomlagring.isError;

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

    if (!søker.data) {
        return <ErrorPage error="Søkerdata mangler" />;
    }
    if (!registrerteBarn.data) {
        return <ErrorPage error="Barnedata mangler" />;
    }

    return <Søknad søker={søker.data} barn={registrerteBarn.data} mellomlagring={mellomlagring.data ?? undefined} />;
};
