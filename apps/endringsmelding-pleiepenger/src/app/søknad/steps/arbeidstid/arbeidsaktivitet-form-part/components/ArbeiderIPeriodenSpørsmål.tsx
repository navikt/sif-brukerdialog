import React from 'react';
import { FormikRadioGroup, IntlErrorObject } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ArbeidsaktivitetArbeidstaker, ArbeiderIPeriodenSvar } from '@types';

interface Props {
    arbeidsaktivitet: ArbeidsaktivitetArbeidstaker;
    parentFieldName: string;
}

export const ArbeiderIPeriodenSvarTekst = {
    [ArbeiderIPeriodenSvar.heltFravær]: 'Jeg jobber ikke og har fullt fravær her',
    [ArbeiderIPeriodenSvar.redusert]: 'Jeg kombinerer delvis jobb med pleiepenger',
    [ArbeiderIPeriodenSvar.somVanlig]: 'Jeg jobber som normalt og har ingen fravær her',
};

const ArbeiderIPeriodenSpørsmål: React.FunctionComponent<Props> = ({ parentFieldName, arbeidsaktivitet }) => {
    const fieldName = `${parentFieldName}.arbeiderIPerioden`;

    return (
        <FormikRadioGroup
            name={fieldName}
            legend={`I perioden med pleiepenger, hvilken situasjon gjelder for deg hos ${arbeidsaktivitet.arbeidsgiver.navn}?`}
            validate={getArbeidIPeriodeArbeiderIPeriodenValidator(arbeidsaktivitet.arbeidsgiver.navn)}
            radios={[
                {
                    label: ArbeiderIPeriodenSvarTekst[ArbeiderIPeriodenSvar.heltFravær],
                    value: ArbeiderIPeriodenSvar.heltFravær,
                    'data-testid': ArbeiderIPeriodenSvar.heltFravær,
                },
                {
                    label: ArbeiderIPeriodenSvarTekst[ArbeiderIPeriodenSvar.redusert],
                    value: ArbeiderIPeriodenSvar.redusert,
                    'data-testid': ArbeiderIPeriodenSvar.redusert,
                },
                {
                    label: ArbeiderIPeriodenSvarTekst[ArbeiderIPeriodenSvar.somVanlig],
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
