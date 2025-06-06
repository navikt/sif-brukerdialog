import { appEnv } from './utils/appEnv';

const { INNSYN_PP, PLEIEPENGER_SYKT_BARN_URL, ENDRINGSMELDING_PP } = appEnv;

interface Lenker {
    medlemskap: string;
    papirskjemaPrivat: string;
    vilkårOmsorgspenger: string;
    personvern: string;
    rettOgPlikt: string;
    saksbehandlingstider: string;
    INNSYN_PP: string;
    pleiepengerSyktBarn: string;
    skrivTilOss: string;
    endringsmelding: string;
}

const LenkerBokmål: Lenker = {
    medlemskap:
        'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Relatert+informasjon/medlemskap-i-folketrygden',
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger',
    personvern: 'https://www.nav.no/personvernerklaering',
    rettOgPlikt: 'https://nav.no/rettOgPlikt',
    saksbehandlingstider: 'https://www.nav.no/saksbehandlingstider',
    INNSYN_PP: INNSYN_PP,
    pleiepengerSyktBarn: PLEIEPENGER_SYKT_BARN_URL,
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
    endringsmelding: ENDRINGSMELDING_PP,
};

const LenkerNynorsk: Partial<Lenker> = {
    medlemskap: 'https://www.nav.no/no/Person/Flere+tema/Arbeid+og+opphold+i+Norge/Nynorsk/medlemskap-i-folketrygda',
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/familie/sykdom-i-familien/nn/omsorgspenger',
    rettOgPlikt:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Nynorsk/du-har-plikt-til-%C3%A5-gje-nav-riktige-opplysningar',
};

const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...LenkerBokmål,
                ...LenkerNynorsk,
            };
        default:
            return LenkerBokmål;
    }
};

export default getLenker;
