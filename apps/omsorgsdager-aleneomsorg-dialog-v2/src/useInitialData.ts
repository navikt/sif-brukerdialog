import { isForbiddenApiError } from '@sif/api';
import { RegistrertBarn, Søker, useRegistrerteBarn, useSøker } from '@sif/api/k9-brukerdialog-prosessering';

interface InitialData {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'forbidden' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const requiredQueries = [søker, registrerteBarn];

    if (requiredQueries.some((query) => query.isPending)) {
        return { status: 'loading' };
    }

    const errors = requiredQueries.filter((query) => query.isError).map((query) => query.error);
    if (errors.length > 0) {
        return errors.some(isForbiddenApiError) ? { status: 'forbidden' } : { status: 'error', errors };
    }

    if (!søker.data || !registrerteBarn.data) {
        return { status: 'error', errors: [new Error('Nødvendig data mangler')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
            registrerteBarn: registrerteBarn.data,
        },
    };
};
