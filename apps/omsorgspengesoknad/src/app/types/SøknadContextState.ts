import { BarnOppslag, Søker } from '@navikt/sif-common-query';
import { GyldigeVedtak } from './GyldigeVedtak';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: BarnOppslag[];
    gyldigeVedtak: GyldigeVedtak;
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
    isReloadingApp?: boolean;
}
