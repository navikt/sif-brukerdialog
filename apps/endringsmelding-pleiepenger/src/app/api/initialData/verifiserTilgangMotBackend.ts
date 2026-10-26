import { appLogger } from '@sif/apm';
import { AxiosError } from 'axios';

import api from '../api';
import { ApiEndpointPsb } from '../endpoints';
import { IngenTilgangError } from './initialDataError';

/** Midlertidig: sammenligner tilgangsvurderingen med backend og logger avvik, uten å påvirke dialogen. */

type Tilgangsvurdering = {
    kanBruke: boolean;
    årsaker: string[];
};

export const hentBackendTilgang = async (): Promise<Tilgangsvurdering | undefined> => {
    try {
        const { data } = await api.psb.get<Tilgangsvurdering>(ApiEndpointPsb.tilgang);
        return data;
    } catch (error) {
        appLogger.logApiError(error as AxiosError, 'tilgangVerifisering.hentBackendTilgang');
        return undefined;
    }
};

const formater = ({ kanBruke, årsaker }: Tilgangsvurdering): string =>
    `kanBruke=${kanBruke} årsaker=[${[...årsaker].sort().join(',')}]`;

export const loggAvvik = (frontend: Tilgangsvurdering, backend: Tilgangsvurdering | undefined): void => {
    if (!backend) {
        return;
    }
    const frontendTekst = formater(frontend);
    const backendTekst = formater(backend);
    if (frontendTekst !== backendTekst) {
        appLogger.logInfo(`tilgangVerifisering.avvik frontend(${frontendTekst}) backend(${backendTekst})`);
    }
};

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
