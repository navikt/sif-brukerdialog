import { Link } from '@navikt/ds-react';

interface Lenker {
    skrivTilOss: string;
    kontaktOss: string;
    personvern: string;
    beskjedOmFamilie: string;
}

const LenkerBokmål: Lenker = {
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
    kontaktOss: 'https://www.nav.no/kontaktoss',
    beskjedOmFamilie: 'https://www.nav.no/send-beskjed-om-familie',
    personvern:
        'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten',
};

export const getLenker = (locale?: string): Lenker => {
    switch (locale) {
        case 'nn':
            return {
                ...LenkerBokmål,
            };
        default:
            return LenkerBokmål;
    }
};

export const SkrivTilOssLink = () => <Link href={getLenker().skrivTilOss}>Skriv til oss</Link>;
