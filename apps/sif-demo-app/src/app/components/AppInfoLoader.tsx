import {
    MellomlagringYtelse,
    useRegistrerteBarn,
    useSøker,
    useYtelseMellomlagringService,
} from '@navikt/sif-common-query';

import { Søknad } from '../Søknad';
import { ErrorPage } from '../pages/ErrorPage';
import { LoadingPage } from '../pages/LoadingPage';

export const AppInfoLoader = () => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const mellomlagring = useYtelseMellomlagringService(MellomlagringYtelse.AKTIVITETSPENGER);

    const isLoading = søker.isLoading || registrerteBarn.isLoading || mellomlagring.isLoading;
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
        return <ErrorPage error="Søker-data mangler" />;
    }

    return <Søknad søker={søker.data} barn={registrerteBarn.data || []} mellomlagretSøknadsdata={mellomlagring.data} />;
};
