import { dateRangeToISODateRange } from '@navikt/sif-common-utils';
import { Sak } from '../server/api-models/SakSchema';
import { Søknad } from '../types/Søknad';
import { getEndringsmeldinger, getEttersendelser, getPleiepengesøknader } from './søknadUtils';

export const getBrukerprofil = (søknader: Søknad[], saker: Sak[], saksbehandlingstidUker: number | undefined) => {
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
