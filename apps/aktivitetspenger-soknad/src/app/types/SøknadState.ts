import { RegistrertBarn, Søker, UtvidetKontonummerInfo } from '@sif/api';

import { Søknadsdata } from './Søknadsdata';

/**
 * SøknadState inneholder all data som trengs for å fylle ut søknaden. Dvs. data
 * som lastes inn ved oppstart og Søknadsdata som er informasjon for hvert steg som
 * søker fyller ut.
 */
export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontoInfo: UtvidetKontonummerInfo;
    søknadsdata: Søknadsdata;
}
