import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';

export interface MedlemskapSøknadsdataHarIkkeBoddSkalIkkeBo {
    type: 'harIkkeBoddSkalIkkeBo';
    harBoddUtenforNorgeSiste12Mnd: false;
    skalBoUtenforNorgeNeste12Mnd: false;
}
export interface MedlemskapSøknadsdataHarBodd {
    type: 'harBodd';
    harBoddUtenforNorgeSiste12Mnd: true;
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdEnkel[];
    skalBoUtenforNorgeNeste12Mnd: false;
}

export interface MedlemskapSøknadsdataSkalBo {
    type: 'skalBo';
    harBoddUtenforNorgeSiste12Mnd: false;
    skalBoUtenforNorgeNeste12Mnd: true;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdEnkel[];
}

export interface MedlemskapSøknadsdataHarBoddSkalBo {
    type: 'harBoddSkalBo';
    harBoddUtenforNorgeSiste12Mnd: true;
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdEnkel[];
    skalBoUtenforNorgeNeste12Mnd: true;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdEnkel[];
}

export type MedlemskapSøknadsdata =
    | MedlemskapSøknadsdataHarIkkeBoddSkalIkkeBo
    | MedlemskapSøknadsdataHarBodd
    | MedlemskapSøknadsdataSkalBo
    | MedlemskapSøknadsdataHarBoddSkalBo;
