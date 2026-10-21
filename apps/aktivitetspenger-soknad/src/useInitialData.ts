import {
    RegistrertBarn,
    Søker,
    useDagensDato,
    useRegistrerteBarn,
    useSøker,
} from '@sif/api/k9-brukerdialog-prosessering';
import { useTilgjengeligAktivitetspengerSøknad } from '@sif/api/ung-brukerdialog';
import { kontonummerFallback, useKontonummer, UtvidetKontonummerInfo } from '@sif/api/ung-deltakelse-opplyser-deltaker';
import { TilgjengeligSøknadResponse } from '@sif/ung-brukerdialog-api';
import { ISODate } from '@sif/utils';

interface InitialData {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: UtvidetKontonummerInfo;
    tilgjengeligSøknad: TilgjengeligSøknadResponse;
    /** undefined hvis dato ikke kunne hentes – søknaden skal da være stengt */
    dagensDato?: ISODate;
}

type InitialDataResult =
    { status: 'loading' } | { status: 'error'; errors: unknown[] } | { status: 'success'; data: InitialData };

export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const tilgjengeligSøknad = useTilgjengeligAktivitetspengerSøknad();
    const registrerteBarn = useRegistrerteBarn();
    const kontonummer = useKontonummer();
    const dagensDato = useDagensDato();

    const requiredQueries = [søker, registrerteBarn, kontonummer, tilgjengeligSøknad, dagensDato];

    if (requiredQueries.some((q) => q.isLoading)) {
        return { status: 'loading' };
    }

    const errors = requiredQueries.filter((q) => q.isError).map((q) => q.error);
    if (errors.length > 0) {
        return { status: 'error', errors };
    }

    if (!søker.data || !registrerteBarn.data || !tilgjengeligSøknad.data) {
        return { status: 'error', errors: [new Error('Nødvendig data mangler')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
            barn: registrerteBarn.data,
            kontonummer: kontonummer.data ?? kontonummerFallback,
            tilgjengeligSøknad: tilgjengeligSøknad.data,
            dagensDato: dagensDato.data,
        },
    };
};
