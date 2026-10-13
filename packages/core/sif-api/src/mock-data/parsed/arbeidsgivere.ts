import { Arbeidsgivere } from '../../types/Arbeidsgivere';
import { arbeidsgivansenAS } from '../entiteter/organisasjoner';

export const mockArbeidsgivere: Arbeidsgivere = {
    organisasjoner: [
        {
            ...arbeidsgivansenAS,
            ansattFom: arbeidsgivansenAS.ansattFom ? arbeidsgivansenAS.ansattFom : undefined,
            ansattTom: arbeidsgivansenAS.ansattTom ? arbeidsgivansenAS.ansattTom : undefined,
        },
    ],
    privateArbeidsgivere: [],
    frilansoppdrag: [],
};
