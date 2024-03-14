import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { Sak } from '../server/api-models/SakSchema';
import { Søknad } from '../types/Søknad';
import { getPleiepengesøknader } from './søknadUtils';

export const getBrukerprofil = (søknader: Søknad[], saker: Sak[], saksbehandlingstidUker: number | undefined) => {
    const typer = søknader.map((søknad) => søknad.søknadstype);
    const perioder = getPleiepengesøknader(søknader).map((søknad) => {
        return dateRangeToISODateRange({ from: søknad.søknad.fraOgMed, to: søknad.søknad.tilOgMed });
    });

    return {
        antallSøknader: søknader.length,
        antallSaker: saker.length,
        harSaksbehandlingstid: !!saksbehandlingstidUker,
        typer,
        perioder,
    };
};
