import { Søker } from '.';
import { RegistrerteBarn } from './_RegistrerteBarn';

export interface Søkerdata {
    søker: Søker;
    barn: RegistrerteBarn[];
}
