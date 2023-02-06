import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { APP_VERSJON } from '../constants/APP_VERSJON';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak } from '../types/K9Sak';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { TimerEllerProsent } from '../types/TimerEllerProsent';
import appSentryLogger from '../utils/appSentryLogger';
import { getEndringsdato, getMaksEndringsperiode } from '../utils/endringsperiode';
import { getSakFromK9Sak } from '../utils/getSakFromK9Sak';
import { getDateRangeForK9Saker } from '../utils/k9SakUtils';
import { relocateToLoginPage } from '../utils/navigationUtils';
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
    | SøknadInitialIkkeTilgang;

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
    endringsperiode: DateRange
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

    if (!persistedSøknadStateIsValid) {
        await søknadStateEndpoint.purge();
    }

    const persistedSak = persistedSøknadStateIsValid
        ? k9saker.find((k9sak) => k9sak.barn.aktørId === lagretSøknadState.barnAktørId)
        : undefined;

    const getInitialSak = () => {
        if (persistedSak) {
            return getSakFromK9Sak(persistedSak, arbeidsgivere, endringsperiode);
        }
        if (k9saker.length === 1) {
            return getSakFromK9Sak(k9saker[0], arbeidsgivere, endringsperiode);
        }
        return undefined;
    };

    return Promise.resolve({
        versjon: APP_VERSJON,
        endringsperiode,
        søker,
        k9saker: k9saker,
        sak: getInitialSak(),
        arbeidsgivere,
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
            const endringsperiode = getMaksEndringsperiode(getEndringsdato());
            const arbeidsgivere = await arbeidsgivereEndpoint.fetch(endringsperiode);

            const [søker, k9saker, lagretSøknadState] = await Promise.all([
                søkerEndpoint.fetch(),
                sakerEndpoint.fetch(),
                søknadStateEndpoint.fetch(),
            ]);

            const samletTidsperiode = getDateRangeForK9Saker(k9saker);
            if (samletTidsperiode === undefined) {
                setInitialData({
                    status: RequestStatus.success,
                    kanBrukeSøknad: false,
                    årsak: IngenTilgangÅrsak.finnerIkkeTidsperiode,
                    søker,
                });
                return Promise.resolve();
            }

            const resultat = tilgangskontroll(k9saker, arbeidsgivere);
            if (resultat.kanBrukeSøknad === false) {
                setInitialData({
                    status: RequestStatus.success,
                    kanBrukeSøknad: false,
                    årsak: resultat.årsak,
                    søker,
                });
                return Promise.resolve();
            }

            setInitialData({
                status: RequestStatus.success,
                kanBrukeSøknad: true,
                data: await setupSøknadInitialData(
                    { søker, arbeidsgivere, k9saker: k9saker, lagretSøknadState },
                    endringsperiode
                ),
            });
            return Promise.resolve();
        } catch (error: any) {
            if (isUnauthorized(error)) {
                relocateToLoginPage();
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.forbidden,
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
