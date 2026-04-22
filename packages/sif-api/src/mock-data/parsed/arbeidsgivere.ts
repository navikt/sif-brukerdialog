import { ISODateToDate } from '@navikt/sif-common-utils';

import { Arbeidsgivere } from '../../types/Arbeidsgivere';
import { arbeidsgivansenAS } from '../entiteter/organisasjoner';

export const mockArbeidsgivere: Arbeidsgivere = {
    organisasjoner: [
        {
            ...arbeidsgivansenAS,
            ansattFom: arbeidsgivansenAS.ansattFom ? ISODateToDate(arbeidsgivansenAS.ansattFom) : undefined,
            ansattTom: arbeidsgivansenAS.ansattTom ? ISODateToDate(arbeidsgivansenAS.ansattTom) : undefined,
        },
    ],
    privateArbeidsgivere: [],
    frilansoppdrag: [],
};
