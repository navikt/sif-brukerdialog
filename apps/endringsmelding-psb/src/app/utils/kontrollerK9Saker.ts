import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak } from '../types/K9Sak';

type TilgangNektet = {
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak;
};

type TilgangTillatt = {
    kanBrukeSøknad: true;
    k9sak: K9Sak;
};

export type TilgangKontrollResultet = TilgangNektet | TilgangTillatt;

export const kontrollerK9Saker = (saker: K9Sak[]): TilgangKontrollResultet => {
    if (saker.length === 0) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harIngenSaker,
        };
    }
    if (saker.length > 1) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harMerEnnEnSak,
        };
    }

    const sak = saker[0];
    const {
        ytelse: { søknadsperioder },
    } = sak;
    if (søknadsperioder.length === 0) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harIkkeSøknadsperiode,
        };
    }
    return {
        kanBrukeSøknad: true,
        k9sak: sak,
    };
};
