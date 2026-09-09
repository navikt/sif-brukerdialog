import { YesOrNo } from '@sif/rhf';
import { ArbeidUtland, BostedUtland } from '@sif/soknad-forms';

export enum BostedUtlandFormFields {
    harBoddINorge = 'harBoddINorge',
    harJobbetINorge = 'harJobbetINorge',
    harJobbetUtenforNorge = 'harJobbetUtenforNorge',
    bostederUtenforNorge = 'bostederUtenforNorge',
    arbeidsstederUtenforNorge = 'arbeidsstederUtenforNorge',
}

export interface BostedUtlandFormValues {
    [BostedUtlandFormFields.harBoddINorge]?: YesOrNo;
    [BostedUtlandFormFields.harJobbetINorge]?: YesOrNo;
    [BostedUtlandFormFields.harJobbetUtenforNorge]?: YesOrNo;
    [BostedUtlandFormFields.bostederUtenforNorge]?: BostedUtland[];
    [BostedUtlandFormFields.arbeidsstederUtenforNorge]?: ArbeidUtland[];
}
