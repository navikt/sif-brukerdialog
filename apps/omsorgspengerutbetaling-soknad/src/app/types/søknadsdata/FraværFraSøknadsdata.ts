import { AktivitetFravær } from '../AktivitetFravær';

interface HarFraværFra {
    type: 'harFraværFra';
    aktivitetFravær: AktivitetFravær[];
}

export type FraværFraSøknadsdata = HarFraværFra;
