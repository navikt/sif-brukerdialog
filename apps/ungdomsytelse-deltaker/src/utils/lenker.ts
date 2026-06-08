import { getLocaleFromSessionStorage } from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import { getSifLenker } from '@sif/soknad-ui/lenker';

import { getAppEnv } from './appEnv';

interface Lenker {
    omUngdomsprogramytelsen: string;
    personvern: string;
    rettOgPlikt: string;
    personopplysninger: string;
    minSide: string;
    skatteetaten: string;
    skattekort: string;
    lovdataInntekt: string;
    endreKontonummer: string;
    skrivtilOss: string;
    dokumentarkiv: string;
}

const getEnvironment = () => (getAppEnv().ENV === 'dev' ? 'dev' : 'prod');

const getLenker = (): Lenker => {
    const lenker = getSifLenker(getLocaleFromSessionStorage(), getEnvironment());

    return {
        omUngdomsprogramytelsen: lenker.navUngdomsprogrammet,
        personvern: lenker.navPersonvernerklaering,
        rettOgPlikt: lenker.navRettOgPlikt,
        personopplysninger: lenker.navPersonopplysninger,
        minSide: lenker.navMinSide,
        skatteetaten: lenker.skatteetatenForside,
        skattekort: lenker.skatteetatenSkattekort,
        lovdataInntekt: lenker.lovdataFolketrygdlovenParagraf5_10,
        endreKontonummer: lenker.navEndreKontonummer,
        skrivtilOss: lenker.navSkrivTilOss,
        dokumentarkiv: lenker.navDokumentarkivUngdomsytelse,
    };
};

export default getLenker;
