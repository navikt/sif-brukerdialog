import { RegistrertBarn, Søker, useRegistrerteBarn, useSøker } from '@sif/api/k9-prosessering';
import { kontonummerFallback, useKontonummer, UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';

interface InitialData {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: UtvidetKontonummerInfo;
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const kontonummer = useKontonummer();

    const requiredQueries = [søker, registrerteBarn];

    if (requiredQueries.some((q) => q.isLoading) || kontonummer.isLoading) {
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
            kontonummer: kontonummer.data ?? kontonummerFallback,
        },
    };
};
