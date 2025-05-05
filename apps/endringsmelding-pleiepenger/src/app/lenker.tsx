import { Link } from '@navikt/ds-react';
import { AppText } from './i18n';

interface Lenker {
    beskjedTilOss: string;
    skrivTilOss: string;
    kontaktOss: string;
    personvern: string;
    beskjedOmFamilie: string;
}

const LenkerBokmål: Lenker = {
    beskjedTilOss: 'https://innboks.nav.no/s/beskjed-til-oss?category=Endring-sykdom-familien',
    skrivTilOss: 'https://innboks.nav.no/s/skriv-til-oss?category=Pleiepenger',
    kontaktOss: 'https://www.nav.no/kontaktoss',
    beskjedOmFamilie: 'https://www.nav.no/send-beskjed-om-familie',
    personvern: 'https://www.nav.no/personvernerklaering',
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

export const SkrivTilOssLink = () => (
    <Link href={getLenker().skrivTilOss}>
        <AppText id="lenke.skrivTilOss" />
    </Link>
);

export const SendBeskjedLink = () => (
    <Link href={getLenker().beskjedTilOss}>
        <AppText id="lenke.sendBeskjed" />
    </Link>
);
