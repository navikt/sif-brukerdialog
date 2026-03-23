import {
    kontonummerFallback,
    RegistrertBarn,
    Søker,
    useKontonummer,
    useRegistrerteBarn,
    useSøker,
    useYtelseMellomlagring,
    UtvidetKontonummerInfo,
} from '@sif/api';
import { useMemo } from 'react';

import { søknadStepConfig } from './app/setup/config/søknadStepConfig';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from './app/setup/constants';
import { MellomlagringMetaData, SøknadMellomlagring } from './app/types/Mellomlagring';

interface InitialData {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: UtvidetKontonummerInfo;
    mellomlagring?: SøknadMellomlagring;
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };

const getValidertMellomlagring = (data: SøknadMellomlagring | null | undefined): SøknadMellomlagring | undefined => {
    if (!data) return undefined;
    const currentStepId = data.currentStepId && søknadStepConfig[data.currentStepId] ? data.currentStepId : undefined;
    return { ...data, currentStepId };
};

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const kontonummer = useKontonummer();

    const metadata = useMemo<MellomlagringMetaData | undefined>((): MellomlagringMetaData | undefined => {
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

    const requiredQueries = [søker, registrerteBarn];

    if (requiredQueries.some((q) => q.isLoading) || kontonummer.isLoading || (metadata && mellomlagring.isLoading)) {
        return { status: 'loading' };
    }

    const errors = [...requiredQueries, mellomlagring].filter((q) => q.isError).map((q) => q.error);
    if (errors.length > 0) {
        return { status: 'error', errors };
    }

    if (!søker.data || !registrerteBarn.data) {
        return { status: 'error', errors: [new Error('Nødvendig data mangler')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
            barn: registrerteBarn.data,
            kontonummer: kontonummer.data ?? kontonummerFallback,
            mellomlagring: getValidertMellomlagring(mellomlagring.data),
        },
    };
};
