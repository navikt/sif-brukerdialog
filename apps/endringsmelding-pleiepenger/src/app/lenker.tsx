import React from 'react';
import { Link } from '@navikt/ds-react';

interface Lenker {
    skrivTilOss: string;
    personvern: string;
}

const LenkerBokmål: Lenker = {
    skrivTilOss: 'https://www.nav.no/skriv-til-oss',
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

export const SkrivTilOssLink = () => <Link href={getLenker().skrivTilOss}>skriv til oss</Link>;
