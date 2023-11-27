import { Søker } from '../server/api-models/Søker';
import { Mellomlagringer } from './Mellomlagring';
import { Søknad } from './Søknad';

export interface Innsynsdata {
    søker: Søker;
    søknader: Søknad[];
    mellomlagring: Mellomlagringer;
    svarfrist: Date;
}
