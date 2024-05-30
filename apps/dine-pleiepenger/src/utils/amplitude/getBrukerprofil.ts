import dayjs from 'dayjs';
import { PleietrengendeMedSak } from '../../server/api-models/PleietrengendeMedSakSchema';
import { Brukerprofil } from '../../types/Brukerprofil';
import { InnsendtSøknad } from '../../types/Søknad';
import { getEndringsmeldinger, getEttersendelser, getPleiepengesøknader } from '../innsendtSøknadUtils';

export const getBrukerprofil = (
    søknader: InnsendtSøknad[],
    saker: PleietrengendeMedSak[],
    saksbehandlingstidUker: number | undefined,
): Brukerprofil => {
    const ppSøknader = getPleiepengesøknader(søknader);
    const ppEndringer = getEndringsmeldinger(søknader);
    const ppEttersendelser = getEttersendelser(søknader);

    const sisteSøknad = ppSøknader.length > 0 ? ppSøknader[0].opprettet : undefined;
    const sisteEndring = ppEndringer.length > 0 ? ppEndringer[0].opprettet : undefined;
    const sisteEttersendelse = ppEttersendelser.length > 0 ? ppEttersendelser[0].opprettet : undefined;
    const dagerSidenSøknad =
        ppSøknader.length > 0 && ppSøknader[0].opprettet ? dayjs().diff(ppSøknader[0].opprettet, 'days') : undefined;

    return {
        profilVersjon: '1.0',
        antallSøknader: ppSøknader.length,
        antallEttersendelser: ppEttersendelser.length,
        antallEndringsmeldinger: ppEndringer.length,
        sisteSøknad,
        sisteEndring,
        sisteEttersendelse,
        antallSaker: saker.length,
        harSaksbehandlingstid: !!saksbehandlingstidUker,
        dagerSidenSøknad,
    };
};
