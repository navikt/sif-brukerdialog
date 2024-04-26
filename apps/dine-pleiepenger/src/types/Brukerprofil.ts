export type Brukerprofil = {
    profilVersjon: '1.0';
    antallSøknader: number;
    antallEttersendelser: number;
    antallEndringsmeldinger: number;
    antallSaker: number;
    harSaksbehandlingstid: boolean;
    sisteSøknad: Date | undefined;
    sisteEndring: Date | undefined;
    sisteEttersendelse: Date | undefined;
    dagerSidenSøknad: number | undefined;
};
