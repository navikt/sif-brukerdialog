import { RegistrertBarn, Søker, useRegistrerteBarn, useSøker } from '@sif/api/k9-prosessering';

interface InitialData {
    søker: Søker;
    barn: RegistrertBarn[];
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();

    const requiredQueries = [søker, registrerteBarn];

    if (requiredQueries.some((q) => q.isLoading)) {
        return { status: 'loading' };
    }

    const errors = requiredQueries.filter((q) => q.isError).map((q) => q.error);
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
        },
    };
};
