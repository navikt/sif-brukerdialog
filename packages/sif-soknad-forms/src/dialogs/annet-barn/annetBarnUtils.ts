import { dateUtils } from '@navikt/sif-common-utils';
import { hasValue } from '@navikt/sif-validation';
import { datePickerUtils } from '@sif/rhf';

import { AnnetBarn, AnnetBarnFormValues } from './index';

export const isAnnetBarn = (annetBarn: Partial<AnnetBarn>): annetBarn is AnnetBarn => {
    const { fnr, navn, fødselsdato } = annetBarn;
    return hasValue(fnr) && hasValue(navn) && hasValue(fødselsdato);
};

export const formValuesToAnnetBarn = (formValues: AnnetBarnFormValues, id?: string): AnnetBarn => {
    const fødselsdato = datePickerUtils.parseDatePickerValue(formValues.fødselsdato);
    const annetBarn = {
        ...formValues,
        id: id || crypto.randomUUID(),
        fødselsdato,
    };

    if (!isAnnetBarn(annetBarn)) {
        throw new Error('AnnetBarnDialogForm: Form values are not a valid AnnetBarn on submit.');
    }

    return annetBarn;
};

export const annetBarnToFormValues = (annetBarn: Partial<AnnetBarn>): AnnetBarnFormValues => {
    return {
        fnr: annetBarn.fnr,
        navn: annetBarn.navn,
        fødselsdato: annetBarn.fødselsdato ? dateUtils.dateToISODate(annetBarn.fødselsdato) : undefined,
        type: annetBarn.type,
    };
};
