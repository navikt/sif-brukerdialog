import { Søker } from '../server/api-models/SøkerSchema';
import { Mellomlagringer } from './Mellomlagring';
import { Sak } from './Sak';
import { Søknad } from './Søknad';

export interface Innsynsdata {
    søker: Søker;
    søknader: Søknad[];
    mellomlagring: Mellomlagringer;
    saker: Sak[];
    saksbehandlingstidUker?: number;
    harSak: boolean;
}
