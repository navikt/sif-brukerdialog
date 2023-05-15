import React from 'react';
import { FormikRadioGroup, IntlErrorObject } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ArbeiderIPeriodenSvar } from '../../../søknad/steps/arbeidssituasjon/components/ArbeidsforholdForm';
import { ArbeidAktivitetArbeidstaker } from '../../../types/Sak';

interface Props {
    arbeidAktivitet: ArbeidAktivitetArbeidstaker;
    fieldName: string;
}

export const ArbeiderIPeriodenSvarTekst = {
    [ArbeiderIPeriodenSvar.heltFravær]: 'Jeg jobber ikke og har fullt fravær her',
    [ArbeiderIPeriodenSvar.redusert]: 'Jeg kombinerer delvis jobb med pleiepenger',
    [ArbeiderIPeriodenSvar.somVanlig]: 'Jeg jobber som normalt og har ingen fravær her',
};

const ArbeiderIPeriodenFormPart: React.FunctionComponent<Props> = ({ fieldName, arbeidAktivitet }) => {
    return (
        <FormikRadioGroup
            name={`${fieldName}`}
            legend={`I perioden med pleiepenger, hvilken situasjon gjelder for deg hos ${arbeidAktivitet.arbeidsgiver.navn}?`}
            validate={getArbeidIPeriodeArbeiderIPeriodenValidator(arbeidAktivitet.arbeidsgiver.navn)}
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
                  key: `validation.arbeidIPeriode.arbeider.${error}`,
                  keepKeyUnaltered: true,
                  values: {
                      navn,
                  },
              }
            : error;
    };

export default ArbeiderIPeriodenFormPart;
