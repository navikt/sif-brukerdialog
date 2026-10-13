import { YesOrNo } from '@sif/rhf';
import { ArbeidUtlandFormData } from '@sif/soknad-forms';

export interface MedlemskapFormValues {
    harBoddINorge?: YesOrNo;
    harJobbetINorge?: YesOrNo;
    harJobbetUtenforNorge?: YesOrNo;
    bostederUtenforNorge?: ArbeidUtlandFormData[];
    arbeidsstederUtenforNorge?: ArbeidUtlandFormData[];
}
