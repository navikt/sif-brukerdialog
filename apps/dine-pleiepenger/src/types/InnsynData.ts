import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Søker } from '../server/api-models/SøkerSchema';
import { Mellomlagringer } from './Mellomlagring';
import { InnsendtSøknad } from './Søknad';

export interface Innsynsdata {
    søker: Søker;
    innsendteSøknader: InnsendtSøknad[];
    mellomlagring: Mellomlagringer;
    saker: PleietrengendeMedSak[];
    saksbehandlingstidUker?: number;
    harSak: boolean;
}
