import {
    ArbeidsgiverMedAnsettelseperioder,
    IngenTilgangÅrsak,
    K9Sak,
    RequestStatus,
    Sak,
    SøknadContextState,
    SøknadInitialDataState,
    TimerEllerProsent,
    UgyldigBarnFormatDetails,
} from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { DateRange } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';
import { useState } from 'react';

import { SøknadStatePersistence } from '../api/endpoints/søknadStateEndpoint';
import { fetchInitialData } from '../api/fetchInitialData';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { getEndringsdato, getTillattEndringsperiode } from '../utils/endringsperiode';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';

export type SøknadInitialData = Omit<SøknadContextState, 'sak'> & { sak: Sak | undefined };

export type IngenTilgangMeta = {
    erArbeidstaker?: boolean;
    erSN?: boolean;
    erFrilanser?: boolean;
    error?: UgyldigBarnFormatDetails;
};

export type SøknadInitialIkkeTilgang = {
    status: RequestStatus.success;
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak[];
    søker: Søker;
    ingenTilgangMeta?: IngenTilgangMeta;
};

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
        antallSakerFørEndringsperiode: number;
        arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
        lagretSøknadState?: SøknadStatePersistence;
    },
    tillattEndringsperiode: DateRange,
): SøknadInitialData => {
    const { arbeidsgivere, lagretSøknadState, k9saker, søker, antallSakerFørEndringsperiode } = loadedData;

    const persistedSak = lagretSøknadState
        ? k9saker.find((k9sak) => k9sak.barn.aktørId === lagretSøknadState.barnAktørId)
        : undefined;

    const getInitialSak = (): Sak | undefined => {
        if (persistedSak) {
            return getSakFromK9Sak(persistedSak, arbeidsgivere, tillattEndringsperiode);
        }
        if (k9saker.length === 1) {
            return getSakFromK9Sak(k9saker[0], arbeidsgivere, tillattEndringsperiode);
        }
        return undefined;
    };

    const sak = getInitialSak();

    return {
        versjon: MELLOMLAGRING_VERSJON,
        tillattEndringsperiode,
        søker,
        k9saker,
        sak,
        arbeidsgivere,
        valgteEndringer:
            sak && lagretSøknadState
                ? lagretSøknadState.valgteEndringer
                : {
                      arbeidstid: false,
                      lovbestemtFerie: false,
                      tilsynsordning: false,
                  },
        søknadsdata: {} as any,
        søknadSteps: [],
        antallSakerFørEndringsperiode,
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
                    const e = error instanceof Error ? error : new Error(String(error));
                    appLogger.logException(e, { context: 'fetchInitialData.error.else' });
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
