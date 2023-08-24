import { Arbeidsgiver } from './Arbeidsgiver';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { ArbeidsgiverDetaljer } from './søknadApiData/SøknadApiData';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    arbeidsgivere: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    kvitteringInfo?: ArbeidsgiverDetaljer[];
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
