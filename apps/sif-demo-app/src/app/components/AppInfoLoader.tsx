import { useQuery } from '@tanstack/react-query';

import { useRegistrerteBarn, useSøker } from '@navikt/sif-common-query';

import { MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { Søknad } from '../Søknad';
import { ErrorPage } from '../pages/ErrorPage';
import { LoadingPage } from '../pages/LoadingPage';
import { Mellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { mellomlagringUtils } from '../utils/mellomlagringUtils';

export const AppInfoLoader = () => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();

    const mellomlagring = useQuery<Mellomlagring | null>({
        queryKey: ['mellomlagring-validated', søker.data?.aktørId],
        queryFn: async () => {
            if (!søker.data) return null;
            const metaData: MellomlagringMetaData = {
                MELLOMLAGRING_VERSJON,
                søker: søker.data,
                barn: registrerteBarn.data || [],
            };
            return mellomlagringUtils.hent(metaData);
        },
        enabled: !!søker.data,
        staleTime: 30 * 1000,
    });

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
        return <ErrorPage error="Søker-data mangler" />;
    }

    return (
        <Søknad søker={søker.data} barn={registrerteBarn.data || []} mellomlagring={mellomlagring.data ?? undefined} />
    );
};
