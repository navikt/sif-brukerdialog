import { useEffect, useState } from 'react';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { APP_VERSJON } from '../constants/APP_VERSJON';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { RequestStatus } from '../types/RequestStatus';
import { K9Sak } from '../types/K9Sak';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { getEndringsdato, getEndringsperiode } from '../utils/endringsperiode';
import { getDateRangeForK9Saker } from '../utils/k9SakUtils';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint from './endpoints/sakerEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';

export type SøknadInitialData = SøknadContextState;

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    data: SøknadInitialData;
};

type SøknadInitialFailed = {
    status: RequestStatus.error;
    error: any;
};

type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

export type SøknadInitialDataState = SøknadInitialSuccess | SøknadInitialFailed | SøknadInitialLoading;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const setupSøknadInitialData = async (loadedData: {
    søker: Søker;
    k9saker: K9Sak[];
    arbeidsgivere: Arbeidsgiver[];
    lagretSøknadState: SøknadStatePersistence;
}): Promise<SøknadInitialData> => {
    const { arbeidsgivere, lagretSøknadState, k9saker, søker } = loadedData;
    const isValid = isPersistedSøknadStateValid(lagretSøknadState, { søker });

    if (!isValid) {
        await søknadStateEndpoint.purge();
    }

    const saker: K9Sak[] = [...k9saker.slice(0, 1)];

    if (k9saker.length > 1) {
        /** TODO */
        // eslint-disable-next-line no-console
        console.log('Flere enn èn sak');
        // throw 'Flere enn én sak';
    }
    const sak = saker.length === 1 ? getSakFromK9Sak(saker[0], arbeidsgivere) : undefined;
    if (sak === undefined) {
        throw 'Ingen sak';
    }

    const lagretSøknadStateToUse = isValid ? lagretSøknadState : defaultSøknadState;
    return Promise.resolve({
        versjon: APP_VERSJON,
        søker,
        sak,
        k9saker: saker,
        arbeidsgivere,
        søknadsdata: {},
        ...lagretSøknadStateToUse,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, k9saker, lagretSøknadState] = await Promise.all([
                søkerEndpoint.fetch(),
                sakerEndpoint.fetch(),
                søknadStateEndpoint.fetch(),
            ]);
            const dateRangeForSaker = getDateRangeForK9Saker(k9saker);
            if (!dateRangeForSaker) {
                throw 'ugyldigTidsrom';
            }
            const endringsperiode = getEndringsperiode(getEndringsdato(), [dateRangeForSaker]);
            const arbeidsgivere = await arbeidsgivereEndpoint.fetch(
                dateToISODate(endringsperiode.from),
                dateToISODate(endringsperiode.to)
            );
            setInitialData({
                status: RequestStatus.success,
                data: await setupSøknadInitialData({ søker, arbeidsgivere, k9saker, lagretSøknadState }),
            });
            return Promise.resolve();
        } catch (error: any) {
            appSentryLogger.logError('fetchInitialData', error);
            setInitialData({
                status: RequestStatus.error,
                error,
            });
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return initialData;
}

export default useSøknadInitialData;
