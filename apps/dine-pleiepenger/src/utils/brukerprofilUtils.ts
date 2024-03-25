import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { getEndringsmeldinger, getEttersendelser, getPleiepengesøknader } from './innsendtSøknadUtils';
import { InnsendtSøknad } from '../types/Søknad';

export const getBrukerprofil = (
    søknader: InnsendtSøknad[],
    saker: PleietrengendeMedSak[],
    saksbehandlingstidUker: number | undefined,
) => {
    const ppSøknader = getPleiepengesøknader(søknader);
    const ppEndringer = getEndringsmeldinger(søknader);
    const ppEttersendelser = getEttersendelser(søknader);
    const perioder = ppSøknader.map((søknad) => {
        return dateRangeToISODateRange({ from: søknad.søknad.fraOgMed, to: søknad.søknad.tilOgMed });
    });

    const sisteSøknad = ppSøknader.length > 0 ? ppSøknader[0].opprettet : undefined;
    const sisteEndring = ppEndringer.length > 0 ? ppEndringer[0].opprettet : undefined;
    const sisteEttersendelse = ppEttersendelser.length > 0 ? ppEttersendelser[0].opprettet : undefined;

    return {
        antallSøknader: ppSøknader.length,
        antallEttersendelser: ppEttersendelser.length,
        antallEndringsmeldinger: ppEndringer.length,
        sisteSøknad,
        sisteEndring,
        sisteEttersendelse,
        antallSaker: saker.length,
        harSaksbehandlingstid: !!saksbehandlingstidUker,
        perioder,
    };
};
