import { IngenTilgangÅrsak, RequestStatus, SøknadInitialDataState } from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { isAxiosError } from 'axios';

/**
 * Signaliserer at bruker ikke kan bruke søknaden. Dette er et forventet utfall, ikke en teknisk feil,
 * og mappes til RequestStatus.success med kanBrukeSøknad: false i mapInitialDataError.
 *
 * Kastes som en Error slik at lastingen avbrytes der avslaget oppdages.
 */
export class IngenTilgangError extends Error {
    readonly årsak: IngenTilgangÅrsak[];

    constructor(årsak: IngenTilgangÅrsak[]) {
        super(`Ingen tilgang: ${årsak.join(', ')}`);
        this.name = 'IngenTilgangError';
        this.årsak = årsak;
    }
}

const requestStatusValues: string[] = Object.values(RequestStatus);

/**
 * En AxiosError har også en status-property (tallverdi fra http-responsen), så det holder ikke
 * å sjekke at status er satt. Kun kjente RequestStatus-verdier regnes som en tilstand fra appen.
 */
export const isSøknadInitialDataErrorState = (error: any): error is SøknadInitialDataState => {
    return (
        error !== null &&
        typeof error === 'object' &&
        typeof error.status === 'string' &&
        requestStatusValues.includes(error.status)
    );
};

/**
 * Oversetter enhver feil fra oppstartslastingen til en tilstand appen kan vise.
 * Alt som ikke er en kjent tilstand eller en håndtert http-status ender som RequestStatus.error,
 * slik at brukeren aldri blir stående med en uhåndtert tilstand.
 */
export const mapInitialDataError = (error: unknown, søker?: Søker): SøknadInitialDataState => {
    if (error instanceof IngenTilgangError) {
        return {
            status: RequestStatus.success,
            kanBrukeSøknad: false,
            årsak: error.årsak,
            /** Avslaget kastes først etter at søker er hentet, så søker er alltid satt her. */
            søker: søker as Søker,
        };
    }
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
