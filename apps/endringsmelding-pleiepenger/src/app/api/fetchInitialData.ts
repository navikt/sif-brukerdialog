import {
    Arbeidsgiver,
    IngenTilgangÅrsak,
    isK9Sak,
    isUgyldigK9SakFormat,
    K9Sak,
    RequestStatus,
    SøknadInitialDataState,
    SøknadInitialIkkeTilgang,
    UgyldigK9SakFormat,
} from '@app/types';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';
import { isAxiosError } from 'axios';

import { IngenTilgangMeta, isSøknadInitialDataErrorState } from '../hooks/useSøknadInitialData';
import { getPeriodeForArbeidsgiverOppslag } from '../utils/initialDataUtils';
import { getSamletDateRangeForK9Saker } from '../utils/k9SakUtils';
import { tilgangskontroll } from '../utils/tilgangskontroll';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import sakerEndpoint, { K9SakResult } from './endpoints/sakerEndpoint';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';

export const fetchInitialData = async (
    tillattEndringsperiode: DateRange,
): Promise<{
    søker: Søker;
    k9saker: K9Sak[];
    antallSakerFørEndringsperiode: number;
    arbeidsgivere: Arbeidsgiver[];
    lagretSøknadState?: SøknadStatePersistence;
}> => {
    let søker: Søker | undefined;

    try {
        const [søkerResult, k9sakerResult] = await Promise.all([fetchSøker(), sakerEndpoint.fetch()]);
        søker = søkerResult;

        if (k9sakerResult.k9Saker.length === 0 && k9sakerResult.eldreSaker.length === 0) {
            appLogger.logInfo('fetchInitialData.ingenSaker');
        }

        const sakerInnenforEndringsperiode = k9sakerResult.k9Saker;
        const sakerFørEndringsperiode = k9sakerResult.eldreSaker;

        const { k9saker, dateRangeAlleSaker } = await kontrollerSaker(
            sakerInnenforEndringsperiode,
            sakerFørEndringsperiode.length,
            tillattEndringsperiode,
        );

        const periodeForArbeidsgiveroppslag = getPeriodeForArbeidsgiverOppslag(
            dateRangeAlleSaker,
            tillattEndringsperiode,
        );
        if (!periodeForArbeidsgiveroppslag) {
            return Promise.reject(
                mapInitialDataError(
                    getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
                    søker,
                ),
            );
        }

        const arbeidsgivere = await arbeidsgivereEndpoint.fetch(periodeForArbeidsgiveroppslag);

        await kontrollerTilgang(k9saker, tillattEndringsperiode);

        const lagretSøknadState = await hentOgKontrollerLagretSøknadState(
            søker,
            k9saker,
            arbeidsgivere,
            tillattEndringsperiode,
        );

        return {
            søker,
            arbeidsgivere,
            k9saker,
            antallSakerFørEndringsperiode: sakerFørEndringsperiode.length,
            lagretSøknadState,
        };
    } catch (error) {
        return Promise.reject(mapInitialDataError(error, søker));
    }
};

/**
 * Oversetter enhver feil fra oppstartslastingen til en tilstand appen kan vise.
 * Alt som ikke er en kjent tilstand eller en håndtert http-status ender som RequestStatus.error,
 * slik at brukeren aldri blir stående med en uhåndtert tilstand.
 */
const mapInitialDataError = (error: unknown, søker?: Søker): SøknadInitialDataState => {
    if (isSøknadInitialDataErrorState(error)) {
        return søker ? ({ ...error, søker } as SøknadInitialDataState) : error;
    }
    if (isAxiosError(error)) {
        if (isUnauthorized(error)) {
            return { status: RequestStatus.redirectingToLogin };
        }
        if (isForbidden(error)) {
            return { status: RequestStatus.forbidden };
        }
    }
    return { status: RequestStatus.error, error };
};

const getKanIkkeBrukeSøknadRejection = (
    årsak: IngenTilgangÅrsak[],
    ingenTilgangMeta?: IngenTilgangMeta,
): Pick<SøknadInitialIkkeTilgang, 'årsak' | 'kanBrukeSøknad' | 'status' | 'ingenTilgangMeta'> => {
    return {
        status: RequestStatus.success,
        kanBrukeSøknad: false,
        årsak,
        ingenTilgangMeta,
    };
};

const kontrollerSaker = (
    k9sakerResult: K9SakResult[],
    antallSakerFørEndringsperiode: number,
    tillattEndringsperiode: DateRange,
): Promise<{ k9saker: K9Sak[]; dateRangeAlleSaker: DateRange }> => {
    if (k9sakerResult.length === 0 && antallSakerFørEndringsperiode === 0) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harIngenSak]));
    }
    if (k9sakerResult.length === 0 && antallSakerFørEndringsperiode > 0) {
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
        );
    }

    const ugyldigk9FormatSaker: UgyldigK9SakFormat[] = k9sakerResult.filter(isUgyldigK9SakFormat);
    const k9saker: K9Sak[] = k9sakerResult.filter(isK9Sak);

    if (ugyldigk9FormatSaker.length > 0) {
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection(
                [IngenTilgangÅrsak.harUgyldigK9FormatSak],
                ugyldigk9FormatSaker[0]?.detaljer ? { error: ugyldigk9FormatSaker[0].detaljer } : undefined,
            ),
        );
    }
    const dateRangeAlleSaker = getSamletDateRangeForK9Saker(k9saker);
    if (dateRangeAlleSaker === undefined) {
        return Promise.reject(getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.harIngenPerioder]));
    }
    if (dateRangeUtils.dateRangesCollide([dateRangeAlleSaker, tillattEndringsperiode]) === false) {
        return Promise.reject(
            getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
        );
    }

    return Promise.resolve({ k9saker, dateRangeAlleSaker });
};

const kontrollerTilgang = async (k9saker: K9Sak[], tillattEndringsperiode: DateRange): Promise<boolean> => {
    const resultat = tilgangskontroll(k9saker, tillattEndringsperiode);
    if (resultat.kanBrukeSøknad) {
        return Promise.resolve(true);
    }

    return Promise.reject(getKanIkkeBrukeSøknadRejection(resultat.årsak, resultat.ingenTilgangMeta));
};

const hentOgKontrollerLagretSøknadState = async (
    søker: Søker,
    k9saker: K9Sak[],
    arbeidsgivere: Arbeidsgiver[],
    tillattEndringsperiode: DateRange,
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
        k9saker,
        arbeidsgivere,
        tillattEndringsperiode,
    );
    if (!isValid) {
        await søknadStateEndpoint.purge();
        return Promise.resolve(undefined);
    }
    return Promise.resolve(lagretSøknadState);
};
