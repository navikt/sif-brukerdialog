import { Arbeidsgiver } from './Arbeidsgiver';
import { KvitteringInfo } from './KvitteringInfo';
import { RegistrertBarn } from './RegistrertBarn';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export type TempFormValues = undefined;

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    frilansoppdrag?: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    tempFormData?: TempFormValues;
    kvitteringInfo?: KvitteringInfo;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
