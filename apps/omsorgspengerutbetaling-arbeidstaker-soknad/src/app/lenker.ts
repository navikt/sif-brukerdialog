import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

const lenkerBokmål = {
    skatt_deltFastBosted:
        'https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/delt-fast-bosted-for-felles-barn',
    papirskjemaPrivat: 'https://www.nav.no/soknader#omsorgspenger-hjemme-med-sykt-barn-dager',
    vilkårOmsorgspenger: 'https://www.nav.no/omsorgspenger',
    ettersending: 'https://www.nav.no/ettersende#omsorgspenger-hjemme-med-sykt-barn-dager',
};

type Lenker = typeof lenkerBokmål;

const lenkerNynorsk: Lenker = {
    ...lenkerBokmål,
    skatt_deltFastBosted:
        'https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/delt-fast-bosted-for-felles-barn',
    papirskjemaPrivat: 'https://www.nav.no/soknader#omsorgspengar-heime-med-sjukt-barn-dagar',
    vilkårOmsorgspenger: 'https://www.nav.no/omsorgspenger/nn',
    ettersending: 'https://www.nav.no/ettersende/nn#omsorgspengar-heime-med-sjukt-barn-dagar',
};

const getLenker = (locale?: string): Lenker & SifCommonLenker => {
    switch (locale) {
        case 'nn':
            return {
                ...sifCommonLenkerNynorsk,
                ...lenkerBokmål,
                ...lenkerNynorsk,
            };
        default:
            return {
                ...sifCommonLenkerBokmål,
                ...lenkerBokmål,
            };
    }
};

export default getLenker;
