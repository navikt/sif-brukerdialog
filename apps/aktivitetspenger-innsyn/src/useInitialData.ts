import { Søker, useSøker } from '@sif/api';

interface InitialData {
    søker: Søker;
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();

    const requiredQueries = [søker];

    if (requiredQueries.some((q) => q.isLoading)) {
        return { status: 'loading' };
    }

    const errors = [...requiredQueries].filter((q) => q.isError).map((q) => q.error);
    if (errors.length > 0) {
        return { status: 'error', errors };
    }

    if (!søker.data) {
        return { status: 'error', errors: [new Error('Hent søker feilet')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
        },
    };
};
