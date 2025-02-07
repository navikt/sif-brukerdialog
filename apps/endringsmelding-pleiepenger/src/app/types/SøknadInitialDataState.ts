import { Søker } from '@navikt/sif-common-api';
import { IngenTilgangÅrsak } from '@types';
import { IngenTilgangMeta, SøknadInitialData } from '../hooks';
import { RequestStatus } from './RequestStatus';

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

export type SøknadInitialIkkeTilgang = {
    status: RequestStatus.success;
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak[];
    søker: Søker;
    ingenTilgangMeta?: IngenTilgangMeta;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialError
    | SøknadInitialLoading
    | SøknadInitialForbidden
    | SøknadInitialIkkeTilgang
    | SøknadInitialNotLoggedIn;
