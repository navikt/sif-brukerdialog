import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { isK9Sak, isUgyldigK9SakFormat, K9Sak, UgyldigK9SakFormat } from '../types/K9Sak';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import appSentryLogger from '../utils/appSentryLogger';
import { maskK9Sak } from '../utils/getSakOgArbeidsgivereDebugInfo';
import { getPeriodeForArbeidsgiverOppslag, getSamletDateRangeForK9Saker } from '../utils/k9SakUtils';
import { tilgangskontroll } from '../utils/tilgangskontroll';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint, { K9SakResult } from './endpoints/sakerEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';
import { isSøknadInitialDataErrorState, SøknadInitialIkkeTilgang } from './useSøknadInitialData';

export const getKanIkkeBrukeSøknadRejection = (
    årsak: IngenTilgangÅrsak
): Pick<SøknadInitialIkkeTilgang, 'årsak' | 'kanBrukeSøknad' | 'status'> => {
    return {
        status: RequestStatus.success,
        kanBrukeSøknad: false,
        årsak,
    };
};

const kontrollerSaker = (
    k9sakerResult: K9SakResult[]
): Promise<{ k9saker: K9Sak[]; dateRangeAlleSaker: DateRange }> => {
    const ugyldigk9FormatSaker: UgyldigK9SakFormat[] = k9sakerResult.filter(isUgyldigK9SakFormat);
    const k9saker: K9Sak[] = k9sakerResult.filter(isK9Sak);

    if (ugyldigk9FormatSaker.length > 0) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection(IngenTilgangÅrsak.harUgyldigK9FormatSak));
    }
    const dateRangeAlleSaker = getSamletDateRangeForK9Saker(k9saker);
    if (dateRangeAlleSaker === undefined) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection(IngenTilgangÅrsak.harIngenPerioder));
    }
    return Promise.resolve({ k9saker, dateRangeAlleSaker });
};

const kontrollerTilgang = async (
    k9saker: K9Sak[],
    arbeidsgivere: Arbeidsgiver[],
    tillattEndringsperiode: DateRange
): Promise<boolean> => {
    const resultat = tilgangskontroll(k9saker, arbeidsgivere, tillattEndringsperiode);
    if (resultat.kanBrukeSøknad) {
        return Promise.resolve(true);
    }
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
    return Promise.reject(getKanIkkeBrukeSøknadRejection(resultat.årsak));
};

const hentOgKontrollerLagretSøknadState = async (
    søker: Søker,
    k9saker: K9Sak[]
): Promise<SøknadStatePersistence | undefined> => {
    const lagretSøknadState = await søknadStateEndpoint.fetch();

    if (lagretSøknadState === undefined) {
        return undefined;
    }
    const isValid = isPersistedSøknadStateValid(
        lagretSøknadState,
        {
            søker,
            barnAktørId: lagretSøknadState.barnAktørId,
        },
        k9saker
    );
    if (!isValid) {
        await søknadStateEndpoint.purge();
        return Promise.resolve(undefined);
    }
    return Promise.resolve(lagretSøknadState);
};

export const fetchInitialData = async (
    tillattEndringsperiode: DateRange
): Promise<{
    søker: Søker;
    k9saker: K9Sak[];
    arbeidsgivere: Arbeidsgiver[];
    lagretSøknadState?: SøknadStatePersistence;
}> => {
    const [søker, k9sakerResult] = await Promise.all([søkerEndpoint.fetch(), sakerEndpoint.fetch()]);

    const handleInitialDataError = (error: any) => {
        if (isSøknadInitialDataErrorState(error)) {
            return Promise.reject({
                ...error,
                søker,
            });
        }
        return Promise.reject(error);
    };

    try {
        let k9saker: K9Sak[];
        let arbeidsgivere: Arbeidsgiver[];

        return kontrollerSaker(k9sakerResult)
            .then((result) => {
                k9saker = result.k9saker;
                return arbeidsgivereEndpoint.fetch(
                    getPeriodeForArbeidsgiverOppslag(result.dateRangeAlleSaker, tillattEndringsperiode)
                );
            })
            .then((result) => {
                arbeidsgivere = result;
                return kontrollerTilgang(k9saker, arbeidsgivere, tillattEndringsperiode);
            })
            .then(() => hentOgKontrollerLagretSøknadState(søker, k9saker))
            .then((lagretSøknadState) => {
                return Promise.resolve({
                    søker,
                    arbeidsgivere,
                    k9saker,
                    lagretSøknadState,
                });
            })
            .catch(handleInitialDataError);
    } catch (error) {
        if (isUnauthorized(error)) {
            return Promise.reject({
                status: RequestStatus.redirectingToLogin,
            });
        } else if (isForbidden(error)) {
            return Promise.reject({
                status: RequestStatus.forbidden,
            });
        } else {
            return Promise.reject({
                status: RequestStatus.error,
                error,
            });
        }
    }
};
