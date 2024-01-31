import { Søker } from '../server/api-models/SøkerSchema';
import { Mellomlagringer } from './Mellomlagring';
import { Søknad } from './Søknad';

export interface Innsynsdata {
    søker: Søker;
    søknader: Søknad[];
    mellomlagring: Mellomlagringer;
    svarfrist?: Date;
    behandlingstid?: {
        uker: number;
    };
}
