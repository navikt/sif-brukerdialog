import { useKontonummer, useRegistrerteBarn, useSøker, useYtelseMellomlagring } from '@navikt/sif-common-query';
import { useMemo } from 'react';

import { ErrorPage } from './app/pages/error/ErrorPage';
import { LoadingPage } from './app/pages/loading/LoadingPage';
import { søknadStepConfig } from './app/setup/config/søknadStepConfig';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from './app/setup/constants';
import { Søknad } from './app/Søknad';
import { MellomlagringMetaData, SøknadMellomlagring } from './app/types/Mellomlagring';

const getValidertMellomlagring = (data: SøknadMellomlagring | null | undefined): SøknadMellomlagring | undefined => {
    if (!data) return undefined;
    const currentStepId = data.currentStepId && søknadStepConfig[data.currentStepId] ? data.currentStepId : undefined;
    return { ...data, currentStepId };
};

export const AppInitialDataLoader = () => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const kontonummer = useKontonummer();

    const metadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!søker.isFetched || !registrerteBarn.isFetched || !søker.data || !registrerteBarn.data) {
            return undefined;
        }
        return {
            MELLOMLAGRING_VERSJON,
            søker: søker.data,
            barn: registrerteBarn.data,
        };
    }, [søker.isFetched, registrerteBarn.isFetched, søker.data, registrerteBarn.data]);

    const mellomlagring = useYtelseMellomlagring<SøknadMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

    const isLoading =
        søker.isLoading || registrerteBarn.isLoading || kontonummer.isLoading || (metadata && mellomlagring.isLoading);
    const isError = søker.isError || registrerteBarn.isError || kontonummer.isError || mellomlagring.isError;

    if (isLoading) {
        return <LoadingPage />;
    }

    if (isError) {
        const errorMessages = [
            søker.error?.message,
            registrerteBarn.error?.message,
            kontonummer.error?.message,
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

    return (
        <Søknad
            søker={søker.data}
            barn={registrerteBarn.data}
            kontonummer={kontonummer.data ?? null}
            mellomlagring={getValidertMellomlagring(mellomlagring.data)}
        />
    );
};
