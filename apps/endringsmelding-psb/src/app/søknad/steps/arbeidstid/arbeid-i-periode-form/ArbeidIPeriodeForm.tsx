import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../../../../types/Sak';
import { ArbeidstidFormFields } from '../ArbeidstidStep';
import { arbeidIPeriodeSpørsmålConfig } from './arbeidIPeriodeFormConfig';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues, TimerEllerProsent } from './ArbeidIPeriodeFormValues';
import ArbeidstidInput from './ArbeidstidInput';
import { ArbeidIPeriodeIntlValues, getArbeidstidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';

interface Props {
    values?: ArbeidIPeriodeFormValues;
    arbeidsperiode: DateRange;
    parentFieldName: ArbeidstidFormFields;
    arbeidAktivitet: ArbeidAktivitet;
}

const { YesOrNoQuestion, RadioGroup } = getTypedFormComponents<
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    ValidationError
>();

const ArbeidIPeriodeForm: React.FunctionComponent<Props> = ({
    arbeidAktivitet,
    arbeidsperiode,
    parentFieldName,
    values,
}) => {
    const intl = useIntl();

    const getFieldName = (field: ArbeidIPeriodeFormField): any => {
        return `${parentFieldName}.${field}`;
    };

    const getHeading = (): string => {
        switch (arbeidAktivitet.type) {
            case ArbeidAktivitetType.arbeidstaker:
                return arbeidAktivitet.arbeidsgiver.navn;
            case ArbeidAktivitetType.frilanser:
                return 'Frilanser';
            case ArbeidAktivitetType.selvstendigNæringsdrivende:
                return 'Selvstendig næringsdrivende';
        }
    };

    const arbeidsstedNavn = getHeading();

    const visibility = arbeidIPeriodeSpørsmålConfig.getVisbility({
        formValues: values || {},
        arbeidsperiode,
    });

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        arbeidsforhold: {
            type: arbeidAktivitet.type,
            arbeidsstedNavn,
        },
        periode: arbeidsperiode,
    });

    const timerEllerProsent = values?.timerEllerProsent;

    return (
        <>
            {visibility.isIncluded(ArbeidIPeriodeFormField.erLiktHverUke) && (
                <FormBlock>
                    <YesOrNoQuestion
                        name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                        legend={intlHelper(intl, `arbeidIPeriode.erLiktHverUke.spm`, intlValues)}
                        data-testid="er-likt-hver-uke"
                        labels={{
                            yes: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.ja`),
                            no: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.nei`),
                        }}
                    />
                </FormBlock>
            )}
            {visibility.isIncluded(ArbeidIPeriodeFormField.timerEllerProsent) && (
                <FormBlock>
                    <RadioGroup
                        name={getFieldName(ArbeidIPeriodeFormField.timerEllerProsent)}
                        legend={intlHelper(intl, `arbeidIPeriode.timerEllerProsent.spm`, intlValues)}
                        radios={getTimerEllerProsentRadios(intl, intlValues)}
                    />
                </FormBlock>
            )}

            {visibility.isVisible(ArbeidIPeriodeFormField.timerEllerProsent) && timerEllerProsent && (
                <ArbeidstidInput
                    arbeidIPeriode={values}
                    parentFieldName={parentFieldName}
                    intlValues={intlValues}
                    timerEllerProsent={timerEllerProsent}
                />
            )}
        </>
    );
};

export default ArbeidIPeriodeForm;

const getTimerEllerProsentRadios = (intl: IntlShape, intlValues: ArbeidIPeriodeIntlValues) => [
    {
        label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.prosent`, intlValues),
        value: TimerEllerProsent.PROSENT,
        'data-testid': TimerEllerProsent.PROSENT,
    },
    {
        label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.timer`, intlValues),
        value: TimerEllerProsent.TIMER,
        'data-testid': TimerEllerProsent.TIMER,
    },
];
