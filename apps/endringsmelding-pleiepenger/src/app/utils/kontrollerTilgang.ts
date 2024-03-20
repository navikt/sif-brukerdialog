import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { DateRange } from '@navikt/sif-common-utils';
import { getKanIkkeBrukeSøknadRejection } from '../api/fetchInitialData';
import { K9Sak } from '../types';
import { appSentryLogger, maskK9Sak, tilgangskontroll } from './';

export const kontrollerTilgang = async (k9saker: K9Sak[], tillattEndringsperiode: DateRange): Promise<boolean> => {
    const resultat = tilgangskontroll(k9saker, tillattEndringsperiode);
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
                }),
            );
        } else {
            appSentryLogger.logInfo(
                'IkkeTilgangSakInfo',
                JSON.stringify({
                    årsak: resultat.årsak,
                }),
            );
        }
    }
    return Promise.reject(getKanIkkeBrukeSøknadRejection(resultat.årsak, resultat.ingenTilgangMeta));
};
