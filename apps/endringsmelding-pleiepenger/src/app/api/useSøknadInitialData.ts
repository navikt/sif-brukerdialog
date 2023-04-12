import { useState } from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { APP_VERSJON } from '../constants/APP_VERSJON';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { isK9Sak, isUgyldigK9SakFormat, K9Sak, UgyldigK9SakFormat } from '../types/K9Sak';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { TimerEllerProsent } from '../types/TimerEllerProsent';
import appSentryLogger from '../utils/appSentryLogger';
import { getEndringsdato, getTillattEndringsperiode } from '../utils/endringsperiode';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';
import { getSakOgArbeidsgivereDebugInfo, maskK9Sak } from '../utils/getSakOgArbeidsgivereDebugInfo';
import {
    getPeriodeForArbeidsgiverOppslag,
    getSamletDateRangeForK9Saker as getDateRangeForK9Saker,
} from '../utils/k9SakUtils';
import { tilgangskontroll } from '../utils/tilgangskontroll';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint from './endpoints/sakerEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';

export type SøknadInitialData = Omit<SøknadContextState, 'sak'>;

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

type SøknadInitialIkkeTilgang = {
    status: RequestStatus.success;
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak;
    søker: Søker;
};

type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialError
    | SøknadInitialLoading
    | SøknadInitialForbidden
    | SøknadInitialIkkeTilgang
    | SøknadInitialNotLoggedIn;

const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const setupSøknadInitialData = async (
    loadedData: {
        søker: Søker;
        k9saker: K9Sak[];
        arbeidsgivere: Arbeidsgiver[];
        lagretSøknadState?: SøknadStatePersistence;
    },
    tillattEndringsperiode: DateRange
): Promise<SøknadInitialData> => {
    const { arbeidsgivere, lagretSøknadState, k9saker, søker } = loadedData;

    const persistedSøknadStateIsValid =
        lagretSøknadState &&
        isPersistedSøknadStateValid(
            lagretSøknadState,
            {
                søker,
                barnAktørId: lagretSøknadState.barnAktørId,
            },
            k9saker
        );

    if (lagretSøknadState && !persistedSøknadStateIsValid) {
        await søknadStateEndpoint.purge();
    }

    const persistedSak = persistedSøknadStateIsValid
        ? k9saker.find((k9sak) => k9sak.barn.aktørId === lagretSøknadState.barnAktørId)
        : undefined;

    const getInitialSak = () => {
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

    return Promise.resolve({
        versjon: APP_VERSJON,
        tillattEndringsperiode,
        søker,
        k9saker,
        sak,
        arbeidsgivere,
        hvaSkalEndres: sak && persistedSøknadStateIsValid ? lagretSøknadState.hvaSkalEndres : [],
        søknadsdata: {} as any,
        inputPreferanser: {
            timerEllerProsent: TimerEllerProsent.PROSENT,
        },
        ...(persistedSøknadStateIsValid ? lagretSøknadState : defaultSøknadState),
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const tillattEndringsperiode = getTillattEndringsperiode(getEndringsdato());

            const [søker, k9sakerResult, lagretSøknadState] = await Promise.all([
                søkerEndpoint.fetch(),
                sakerEndpoint.fetch(),
                søknadStateEndpoint.fetch(),
            ]);

            const ugyldigk9FormatSaker: UgyldigK9SakFormat[] = k9sakerResult.filter(isUgyldigK9SakFormat);
            const k9saker: K9Sak[] = k9sakerResult.filter(isK9Sak);

            /** Hvis vi ikke klarer å parse saken */
            if (k9sakerResult.length === 1 && ugyldigk9FormatSaker.length === 1) {
                setInitialData({
                    status: RequestStatus.success,
                    kanBrukeSøknad: false,
                    årsak: IngenTilgangÅrsak.harUgyldigK9FormatSak,
                    søker,
                });
                return Promise.resolve();
            }

            const dateRangeAlleSaker = getDateRangeForK9Saker(k9saker);

            /** Muligens unødvendig sjekk - gitt at K9 alltid gir gyldig data */
            if (dateRangeAlleSaker === undefined && k9saker.length > 0) {
                setInitialData({
                    status: RequestStatus.success,
                    kanBrukeSøknad: false,
                    årsak: IngenTilgangÅrsak.harIngenPerioder,
                    søker,
                });
                return Promise.resolve();
            }

            const arbeidsgivere = dateRangeAlleSaker
                ? await arbeidsgivereEndpoint.fetch(
                      getPeriodeForArbeidsgiverOppslag(dateRangeAlleSaker, tillattEndringsperiode)
                  )
                : [];

            const resultat = tilgangskontroll(k9saker, arbeidsgivere, tillattEndringsperiode);
            if (resultat.kanBrukeSøknad === false) {
                setInitialData({
                    status: RequestStatus.success,
                    kanBrukeSøknad: false,
                    årsak: resultat.årsak,
                    søker,
                });
                if (getEnvironmentVariable('DEBUG') === 'true') {
                    if (k9saker.length === 1) {
                        appSentryLogger.logInfo(
                            'IkkeTilgangSakInfo',
                            JSON.stringify({
                                årsak: resultat.årsak,
                                sak: maskK9Sak(k9saker[0]),
                            })
                        );
                    }
                    if (k9saker.length > 1) {
                        appSentryLogger.logInfo(
                            'IkkeTilgangSakInfo',
                            JSON.stringify({
                                årsak: resultat.årsak,
                            })
                        );
                    }
                }
                return Promise.resolve();
            }

            setInitialData({
                status: RequestStatus.success,
                kanBrukeSøknad: true,
                data: await setupSøknadInitialData(
                    { søker, arbeidsgivere, k9saker, lagretSøknadState },
                    tillattEndringsperiode
                ),
            });
            return Promise.resolve();
        } catch (error: any) {
            if (isUnauthorized(error)) {
                setInitialData({
                    status: RequestStatus.redirectingToLogin,
                });
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.forbidden,
                });
            } else {
                setInitialData({
                    status: RequestStatus.error,
                    error,
                });
            }
        }
    };

    useEffectOnce(() => {
        fetch();
    });

    return initialData;
}

export default useSøknadInitialData;
