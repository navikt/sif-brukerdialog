import { Link } from '@navikt/ds-react';
import { SifCommonLenker, sifCommonLenkerBokmål, sifCommonLenkerNynorsk } from '@navikt/sif-common-soknad-ds';

import { AppText } from './i18n';

const LenkerBokmål = {
    beskjedTilOssEndringsmelding: 'https://innboks.nav.no/s/beskjed-til-oss?category=Endring-sykdom-familien',
    skrivTilOssPleiepenger: 'https://innboks.nav.no/s/skriv-til-oss?category=Pleiepenger',
};

type Lenker = typeof LenkerBokmål;

export const getLenker = (locale?: string): Lenker & SifCommonLenker => {
    switch (locale) {
        case 'nn':
            return {
                ...sifCommonLenkerNynorsk,
                ...LenkerBokmål,
            };
        default:
            return {
                ...sifCommonLenkerBokmål,
                ...LenkerBokmål,
            };
    }
};

export const SkrivTilOssLink = () => (
    <Link href={getLenker().skrivTilOssPleiepenger}>
        <AppText id="lenke.skrivTilOss" />
    </Link>
);

export const SendBeskjedLink = () => (
    <Link href={getLenker().beskjedTilOssEndringsmelding}>
        <AppText id="lenke.sendBeskjed" />
    </Link>
);
