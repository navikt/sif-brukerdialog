import React from 'react';
import { FormikRadioGroup, IntlErrorObject } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { ArbeidsaktivitetArbeidstaker, ArbeiderIPeriodenSvar } from '@types';
import { AppMessageKeys, useAppIntl } from '../../../../../i18n';

interface Props {
    arbeidsaktivitet: ArbeidsaktivitetArbeidstaker;
    parentFieldName: string;
}

export const ArbeiderIPeriodenSvarIntlKey: Record<string, AppMessageKeys> = {
    [ArbeiderIPeriodenSvar.heltFravær]: 'arbeidstidStep.arbeiderIPeriodenSpm.heltFravær',
    [ArbeiderIPeriodenSvar.redusert]: 'arbeidstidStep.arbeiderIPeriodenSpm.redusert',
    [ArbeiderIPeriodenSvar.somVanlig]: 'arbeidstidStep.arbeiderIPeriodenSpm.somVanlig',
};

const ArbeiderIPeriodenSpørsmål: React.FunctionComponent<Props> = ({ parentFieldName, arbeidsaktivitet }) => {
    const { text } = useAppIntl();
    const fieldName = `${parentFieldName}.arbeiderIPerioden`;

    return (
        <FormikRadioGroup
            name={fieldName}
            legend={text('arbeidstidStep.arbeiderIPeriodenSpm.legend', { navn: arbeidsaktivitet.arbeidsgiver.navn })}
            validate={getArbeidIPeriodeArbeiderIPeriodenValidator(arbeidsaktivitet.arbeidsgiver.navn)}
            radios={[
                {
                    label: text(ArbeiderIPeriodenSvarIntlKey[ArbeiderIPeriodenSvar.heltFravær]),
                    value: ArbeiderIPeriodenSvar.heltFravær,
                    'data-testid': ArbeiderIPeriodenSvar.heltFravær,
                },
                {
                    label: text(ArbeiderIPeriodenSvarIntlKey[ArbeiderIPeriodenSvar.redusert]),
                    value: ArbeiderIPeriodenSvar.redusert,
                    'data-testid': ArbeiderIPeriodenSvar.redusert,
                },
                {
                    label: text(ArbeiderIPeriodenSvarIntlKey[ArbeiderIPeriodenSvar.somVanlig]),
                    value: ArbeiderIPeriodenSvar.somVanlig,
                    'data-testid': ArbeiderIPeriodenSvar.somVanlig,
                },
            ]}
        />
    );
};

export const getArbeidIPeriodeArbeiderIPeriodenValidator =
    (navn: string) =>
    (value: any): IntlErrorObject | undefined => {
        const error = getRequiredFieldValidator()(value);
        return error
            ? {
                  key: `ukjentArbeidsforhold.validation.arbeider.${error}`,
                  keepKeyUnaltered: true,
                  values: {
                      navn,
                  },
              }
            : error;
    };

export default ArbeiderIPeriodenSpørsmål;
