import { DateRange } from '@navikt/sif-common-utils';
import { Arbeidsgiver, IngenTilgangÅrsak, K9Sak, RequestStatus, Søker, SøknadInitialIkkeTilgang } from '@types';
import { appSentryLogger } from '@utils';
import { IngenTilgangMeta, isSøknadInitialDataErrorState } from '../hooks/useSøknadInitialData';
import { getPeriodeForArbeidsgiverOppslag } from '../utils/initialDataUtils';
import { kontrollerSaker } from '../utils/kontrollerSaker';
import { kontrollerTilgang } from '../utils/kontrollerTilgang';
import { arbeidsgivereEndpoint } from './endpoints/arbeidsgivereEndpoint';
import { fetchSøkerOgSaker } from './endpoints/fetchSøkerOgSaker';
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
    const { søker, k9sakerResult } = await fetchSøkerOgSaker();

    let k9saker: K9Sak[];
    let arbeidsgivere: Arbeidsgiver[];

    const sakerInnenforEndringsperiode = k9sakerResult.sakerInnenforEndringsperiode;
    const sakerUtenforEndringsperiode = k9sakerResult.sakerUtenforEndringsperiode;

    return kontrollerSaker(sakerInnenforEndringsperiode, sakerUtenforEndringsperiode.length, tillattEndringsperiode)
        .then((result) => {
            k9saker = result.k9saker;
            const periodeForArbeidsgiveroppslag = getPeriodeForArbeidsgiverOppslag(
                result.dateRangeAlleSaker,
                tillattEndringsperiode,
            );
            if (!periodeForArbeidsgiveroppslag) {
                return Promise.reject(
                    getKanIkkeBrukeSøknadRejection([IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode]),
                );
            }
            return arbeidsgivereEndpoint.fetch(periodeForArbeidsgiveroppslag);
        })
        .then((result) => {
            arbeidsgivere = result;
            return kontrollerTilgang(k9saker, tillattEndringsperiode);
        })
        .then(() => hentOgKontrollerLagretSøknadState(søker, k9saker))
        .then((lagretSøknadState) => {
            return Promise.resolve({
                søker,
                arbeidsgivere,
                k9saker,
                antallSakerFørEndringsperiode: sakerUtenforEndringsperiode.length,
                lagretSøknadState,
            });
        })
        .catch((error) => {
            appSentryLogger.logInfo(`handleInitialDataError: ${error?.message}`);
            if (isSøknadInitialDataErrorState(error)) {
                return Promise.reject({
                    ...error,
                    søker,
                });
            }
            return Promise.reject(error);
        });
};

export const getKanIkkeBrukeSøknadRejection = (
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

const hentOgKontrollerLagretSøknadState = async (
    søker: Søker,
    k9saker: K9Sak[],
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
    );
    if (!isValid) {
        await søknadStateEndpoint.purge();
        return Promise.resolve(undefined);
    }
    return Promise.resolve(lagretSøknadState);
};
