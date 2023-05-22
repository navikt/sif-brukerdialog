import { useState } from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { DateRange } from '@navikt/sif-common-utils';
import {
    Arbeidsgiver,
    IngenTilgangÅrsak,
    K9Sak,
    RequestStatus,
    Sak,
    Søker,
    SøknadContextState,
    TimerEllerProsent,
} from '@types';
import { appSentryLogger } from '@utils';
import { SøknadStatePersistence } from '../api/endpoints/søknadStateEndpoint';
import { fetchInitialData } from '../api/fetchInitialData';
import { APP_VERSJON } from '../constants/APP_VERSJON';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { getEndringsdato, getTillattEndringsperiode } from '../utils/endringsperiode';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';
import { getSakOgArbeidsgivereDebugInfo } from '../utils/getSakOgArbeidsgivereDebugInfo';

export type SøknadInitialData = Omit<SøknadContextState, 'sak'> & { sak: Sak | undefined };

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    kanBrukeSøknad: true;
    data: SøknadInitialData;
};

type SøknadInitialError = {
    status: RequestStatus.error;
    error: any;
};

type SøknadInitialForbidden = {
    status: RequestStatus.forbidden;
};

type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

type SøknadInitialNotLoggedIn = {
    status: RequestStatus.redirectingToLogin;
};

export type IngenTilgangMeta = { erArbeidstaker?: boolean; erSN?: boolean; erFrilanser?: boolean };

export type SøknadInitialIkkeTilgang = {
    status: RequestStatus.success;
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak[];
    søker: Søker;
    ingenTilgangMeta?: IngenTilgangMeta;
};

type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialError
    | SøknadInitialLoading
    | SøknadInitialForbidden
    | SøknadInitialIkkeTilgang
    | SøknadInitialNotLoggedIn;

export const isSøknadInitialDataErrorState = (error: any): error is SøknadInitialDataState => {
    return error !== undefined && Object.keys(error).length > 0 && error.status !== undefined;
};

const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const prepInitialData = (
    loadedData: {
        søker: Søker;
        k9saker: K9Sak[];
        arbeidsgivere: Arbeidsgiver[];
        lagretSøknadState?: SøknadStatePersistence;
    },
    tillattEndringsperiode: DateRange
): SøknadInitialData => {
    const { arbeidsgivere, lagretSøknadState, k9saker, søker } = loadedData;

    const persistedSak = lagretSøknadState
        ? k9saker.find((k9sak) => k9sak.barn.aktørId === lagretSøknadState.barnAktørId)
        : undefined;

    const getInitialSak = (): Sak | undefined => {
        if (persistedSak) {
            return getSakFromK9Sak(persistedSak, arbeidsgivere, tillattEndringsperiode);
        }
        if (k9saker.length === 1) {
            const sak = getSakFromK9Sak(k9saker[0], arbeidsgivere, tillattEndringsperiode);
            if (getEnvironmentVariable('DEBUG') === 'true') {
                appSentryLogger.logInfo(
                    'debug.maskedSakInfo',
                    JSON.stringify(
                        getSakOgArbeidsgivereDebugInfo(k9saker[0], sak, arbeidsgivere, tillattEndringsperiode)
                    )
                );
            }
            return sak;
        }
        return undefined;
    };

    const sak = getInitialSak();

    return {
        versjon: APP_VERSJON,
        tillattEndringsperiode,
        søker,
        k9saker,
        sak,
        arbeidsgivere,
        valgtHvaSkalEndres: sak && lagretSøknadState ? lagretSøknadState.valgtHvaSkalEndres : [],
        søknadsdata: {} as any,
        søknadSteps: [],
        inputPreferanser: {
            timerEllerProsent: TimerEllerProsent.PROSENT,
        },
        ...(lagretSøknadState ? lagretSøknadState : defaultSøknadState),
    };
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });
    const tillattEndringsperiode = getTillattEndringsperiode(getEndringsdato());

    const fetch = async () => {
        fetchInitialData(tillattEndringsperiode)
            .then((data) => {
                setInitialData({
                    status: RequestStatus.success,
                    kanBrukeSøknad: true,
                    data: prepInitialData(data, tillattEndringsperiode),
                });
            })
            .catch((error) => {
                if (isSøknadInitialDataErrorState(error)) {
                    setInitialData(error);
                } else {
                    setInitialData({
                        status: RequestStatus.error,
                        error,
                    });
                }
            });
    };

    useEffectOnce(() => {
        fetch();
    });

    return initialData;
}

export default useSøknadInitialData;
