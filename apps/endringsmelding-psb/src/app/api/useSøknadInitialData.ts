import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { APP_VERSJON } from '../constants/APP_VERSJON';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak } from '../types/K9Sak';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import appSentryLogger from '../utils/appSentryLogger';
import { getEndringsdato, getEndringsperiode } from '../utils/endringsperiode';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';
import { getDateRangeForK9Saker } from '../utils/k9SakUtils';
import { relocateToLoginPage } from '../utils/navigationUtils';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint from './endpoints/sakerEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';
import { TimerEllerProsent } from '../types/TimerEllerProsent';

export type SøknadInitialData = Omit<SøknadContextState, 'sak'>;

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

type SøknadRedirectLogin = {
    status: RequestStatus.redirectingToLogin;
};

type SøknadNoAccess = {
    status: RequestStatus.noAccess;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialFailed
    | SøknadInitialLoading
    | SøknadNoAccess
    | SøknadRedirectLogin;

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
    const persistedSøknadStateIsValid = isPersistedSøknadStateValid(
        lagretSøknadState,
        {
            søker,
            barnAktørId: lagretSøknadState.barnAktørId,
        },
        k9saker
    );

    if (!persistedSøknadStateIsValid) {
        await søknadStateEndpoint.purge();
    }
    if (k9saker.length === 0) {
        throw 'Ingen sak';
    }

    const lagretSøknadStateToUse = persistedSøknadStateIsValid ? lagretSøknadState : defaultSøknadState;

    const k9sak = persistedSøknadStateIsValid
        ? k9saker.find((s) => s.barn.aktørId === lagretSøknadState.barnAktørId)
        : k9saker.length === 1
        ? k9saker[0]
        : undefined;

    return Promise.resolve({
        versjon: APP_VERSJON,
        søker,
        k9saker,
        sak: k9sak ? getSakFromK9Sak(k9sak, arbeidsgivere) : undefined,
        arbeidsgivere,
        søknadsdata: {} as any,
        inputPreferanser: {
            timerEllerProsent: TimerEllerProsent.TIMER,
        },
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
            if (isUnauthorized(error)) {
                setInitialData({
                    status: RequestStatus.redirectingToLogin,
                });
                relocateToLoginPage();
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.noAccess,
                });
            } else {
                appSentryLogger.logError('fetchInitialData', error);
                setInitialData({
                    status: RequestStatus.error,
                    error,
                });
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return initialData;
}

export default useSøknadInitialData;
