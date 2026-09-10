import { YesOrNo } from '@sif/rhf';
import { ArbeidUtland } from '@sif/soknad-forms';

export enum MedlemskapFormFields {
    harBoddINorge = 'harBoddINorge',
    harJobbetINorge = 'harJobbetINorge',
    harJobbetUtenforNorge = 'harJobbetUtenforNorge',
    bostederUtenforNorge = 'bostederUtenforNorge',
    arbeidsstederUtenforNorge = 'arbeidsstederUtenforNorge',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddINorge]?: YesOrNo;
    [MedlemskapFormFields.harJobbetINorge]?: YesOrNo;
    [MedlemskapFormFields.harJobbetUtenforNorge]?: YesOrNo;
    [MedlemskapFormFields.bostederUtenforNorge]?: ArbeidUtland[];
    [MedlemskapFormFields.arbeidsstederUtenforNorge]?: ArbeidUtland[];
}
