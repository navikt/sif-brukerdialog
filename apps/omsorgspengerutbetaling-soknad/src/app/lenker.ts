import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    papirskjemaPrivat: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.05/brev',
    vilkårOmsorgspenger: 'https://www.nav.no/omsorgspenger',
    søkeEkstraDager: 'https://www.nav.no/omsorgspenger#ekstra-dager',
    ettersending: 'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere',
};

type Lenker = typeof lenkerBokmål;

const LenkerNynorsk: Partial<Lenker> = {
    vilkårOmsorgspenger: 'https://www.nav.no/omsorgspenger/nn',
    søkeEkstraDager: 'https://www.nav.no/omsorgspenger/nn#ekstra-dagar',
    ettersending: 'https://www.nav.no/start/ettersend-soknad-omsorgspenger-selvstendig-frilansere/nn',
};

const getLenker = (locale?: string): Lenker & SifCommonLenker => {
    switch (locale) {
        case 'nn':
            return {
                ...sifCommonLenkerNynorsk,
                ...lenkerBokmål,
                ...LenkerNynorsk,
            };
        default:
            return {
                ...sifCommonLenkerBokmål,
                ...lenkerBokmål,
            };
    }
};

export default getLenker;
