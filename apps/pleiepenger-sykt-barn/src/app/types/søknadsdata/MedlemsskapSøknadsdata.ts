import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src';

export interface MedlemskapSøknadsdataHarIkkeBoddSkalIkkeBo {
    type: 'harIkkeBoddSkalIkkeBo';
    harBoddUtenforNorgeSiste12Mnd: false;
    skalBoUtenforNorgeNeste12Mnd: false;
}
export interface MedlemskapSøknadsdataHarBodd {
    type: 'harBodd';
    harBoddUtenforNorgeSiste12Mnd: true;
    utenlandsoppholdSiste12Mnd: Utenlandsopphold[];
    skalBoUtenforNorgeNeste12Mnd: false;
}

export interface MedlemskapSøknadsdataSkalBo {
    type: 'skalBo';
    harBoddUtenforNorgeSiste12Mnd: false;
    skalBoUtenforNorgeNeste12Mnd: true;
    utenlandsoppholdNeste12Mnd: Utenlandsopphold[];
}

export interface MedlemskapSøknadsdataHarBoddSkalBo {
    type: 'harBoddSkalBo';
    harBoddUtenforNorgeSiste12Mnd: true;
    utenlandsoppholdSiste12Mnd: Utenlandsopphold[];
    skalBoUtenforNorgeNeste12Mnd: true;
    utenlandsoppholdNeste12Mnd: Utenlandsopphold[];
}

export type MedlemskapSøknadsdata =
    | MedlemskapSøknadsdataHarIkkeBoddSkalIkkeBo
    | MedlemskapSøknadsdataHarBodd
    | MedlemskapSøknadsdataSkalBo
    | MedlemskapSøknadsdataHarBoddSkalBo;
