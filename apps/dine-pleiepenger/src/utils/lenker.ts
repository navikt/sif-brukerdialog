import { getEnvironmentVariable } from './utils/envUtils';

interface Lenker {
    pleiepenger: string;
    saksbehandlingstid: string;
    ettersending: string;
    klageInfo: string;
    regelverkFolketrygden: string;
    minside: string;
    saksoversikt: string;
    dineUtbetalinger: string;
    skrivTilOss: string;
    endringsdialogPleiepenger: string;
    endringerDuMåGiBeskjedOm: string;
    pleiepengerURL: string;
}

const lenkerBokmål: Lenker = {
    saksbehandlingstid: getEnvironmentVariable('SAKBEHANDLINGSTID_INFO_URL'),
    pleiepenger: getEnvironmentVariable('SYKDOM_I_FAMILIEN_INFO_URL'),
    ettersending: getEnvironmentVariable('ETTERSENDING_PLEIEPENGER_URL'),
    klageInfo: getEnvironmentVariable('KLAGE_INFO_URL'),
    regelverkFolketrygden: getEnvironmentVariable('REGELVERK_INFO_URL'),
    minside: getEnvironmentVariable('MIN_SIDE_URL'),
    saksoversikt: 'https://person.nav.no/mine-saker',
    dineUtbetalinger: 'https://tjenester.nav.no/utbetalingsoversikt/',
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
    endringerDuMåGiBeskjedOm: getEnvironmentVariable('ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL'),
    pleiepengerURL: getEnvironmentVariable('PLEIEPENGER_URL'),
    endringsdialogPleiepenger: getEnvironmentVariable('ENDRINGSDIALOG_URL'),
};

const lenkerNynorsk: Partial<Lenker> = {};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...lenkerBokmål,
                ...lenkerNynorsk,
            };
        default:
            return lenkerBokmål;
    }
};

export default getLenker;
