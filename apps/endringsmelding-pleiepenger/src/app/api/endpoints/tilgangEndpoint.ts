import { IngenTilgangÅrsak } from '@app/types';
import { DateRange, ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';
import { isAxiosError } from 'axios';

import api from '../api';
import { ApiEndpointK9SakInnsyn } from './';

type TilgangDto = {
    kanBruke: boolean;
    årsaker: string[];
    /** Satt bare når kanBruke er true */
    tillattEndringsperiode?: { fom: ISODate; tom: ISODate } | null;
};

export type Tilgang =
    { kanBruke: true; tillattEndringsperiode: DateRange } | { kanBruke: false; årsaker: IngenTilgangÅrsak[] };

const kjenteÅrsaker: string[] = Object.values(IngenTilgangÅrsak);

/** Backend kan legge til nye årsaker før frontend kjenner dem. */
const tilÅrsak = (kode: string): IngenTilgangÅrsak => {
    if (kjenteÅrsaker.includes(kode)) {
        return kode as IngenTilgangÅrsak;
    }
    appLogger.logInfo(`tilgangEndpoint.ukjentÅrsak: ${kode}`);
    return IngenTilgangÅrsak.ukjent;
};

export const tilgangEndpoint = {
    fetch: async (): Promise<Tilgang> => {
        try {
            const { data } = await api.k9SakInnsyn.get<TilgangDto>(ApiEndpointK9SakInnsyn.tilgang);
            if (!data.kanBruke) {
                return { kanBruke: false, årsaker: data.årsaker.map(tilÅrsak) };
            }
            if (!data.tillattEndringsperiode) {
                throw new Error('tilgangEndpoint: tillattEndringsperiode mangler ved tilgang');
            }
            const { fom, tom } = data.tillattEndringsperiode;
            return { kanBruke: true, tillattEndringsperiode: { from: ISODateToDate(fom), to: ISODateToDate(tom) } };
        } catch (error) {
            if (isAxiosError(error)) {
                appLogger.logApiError(error, 'tilgangEndpoint.fetch');
            } else {
                appLogger.logException(error, { context: 'tilgangEndpoint.fetch' });
            }
            return Promise.reject(error);
        }
    },
};
