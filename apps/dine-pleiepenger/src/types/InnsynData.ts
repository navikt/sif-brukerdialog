import { Søker } from '../server/api-models/SøkerSchema';
import { Mellomlagringer } from './Mellomlagring';
import { Saker } from './Saker';
import { Søknad } from './Søknad';

export interface Innsynsdata {
    søker: Søker;
    søknader: Søknad[];
    mellomlagring: Mellomlagringer;
    saker: Saker[];
    saksbehandlingstidUker?: number;
    harSak: boolean;
}
