import { appLogger } from '@sif/apm';
import { isAxiosError } from 'axios';

import api from '../api';
import { ApiEndpointPsb } from '../endpoints';
import { IngenTilgangError } from './initialDataError';

/**
 * Midlertidig: tilgangsreglene flyttes til backend. I overgangen kjøres backend-sjekken
 * parallelt med frontend-sjekken, og avvik logges. Backend-resultatet påvirker ikke dialogen.
 */

export type Tilgangsvurdering = {
    kanBruke: boolean;
    årsaker: string[];
};

const LOGG_PREFIX = 'tilgangVerifisering';

/** Rejecter aldri. Feil logges og gir undefined, slik at dialogen ikke påvirkes. */
export const hentBackendTilgang = async (): Promise<Tilgangsvurdering | undefined> => {
    try {
        const { data } = await api.psb.get<Tilgangsvurdering>(ApiEndpointPsb.tilgang);
        if (typeof data?.kanBruke !== 'boolean' || !Array.isArray(data.årsaker)) {
            appLogger.logInfo(`${LOGG_PREFIX}.ugyldigRespons`);
            return undefined;
        }
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            appLogger.logApiError(error, `${LOGG_PREFIX}.hentBackendTilgang`);
        } else {
            appLogger.logException(error, { context: `${LOGG_PREFIX}.hentBackendTilgang` });
        }
        return undefined;
    }
};

/** Årsakene sorteres fordi rekkefølgen ikke har betydning. */
const formater = ({ kanBruke, årsaker }: Tilgangsvurdering): string =>
    `kanBruke=${kanBruke} årsaker=[${[...årsaker].sort().join(',')}]`;

export const loggAvvik = (frontend: Tilgangsvurdering, backend: Tilgangsvurdering | undefined): void => {
    if (!backend) {
        return;
    }
    const frontendTekst = formater(frontend);
    const backendTekst = formater(backend);
    if (frontendTekst !== backendTekst) {
        appLogger.logInfo(`${LOGG_PREFIX}.avvik frontend(${frontendTekst}) backend(${backendTekst})`);
    }
};

/**
 * Returnerer frontendVurdering uendret, og sammenligner utfallet med backend i bakgrunnen.
 * Kun tilgangsutfall sammenlignes; tekniske feil i frontend-vurderingen ignoreres.
 */
export const verifiserTilgangMotBackend = <T>(
    frontendVurdering: Promise<T>,
    backendTilgang: Promise<Tilgangsvurdering | undefined>,
): Promise<T> => {
    frontendVurdering.then(
        () => backendTilgang.then((backend) => loggAvvik({ kanBruke: true, årsaker: [] }, backend)),
        (error) => {
            if (error instanceof IngenTilgangError) {
                backendTilgang.then((backend) => loggAvvik({ kanBruke: false, årsaker: error.årsak }, backend));
            }
        },
    );
    return frontendVurdering;
};
