import { YesOrNo } from '@sif/rhf';
import { ArbeidUtland, BostedUtland } from '@sif/soknad-forms';

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
    [MedlemskapFormFields.bostederUtenforNorge]?: BostedUtland[];
    [MedlemskapFormFields.arbeidsstederUtenforNorge]?: ArbeidUtland[];
}
