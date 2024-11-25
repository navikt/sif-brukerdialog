import { Deltakelse, Søker } from '../../../api/types';

export interface Deltaker extends Søker {
    deltakelser?: Deltakelse[];
}
