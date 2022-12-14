import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidAktivitetUkeEndring } from '../../../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../../../types/K9Sak';
import { ArbeidAktivitet } from '../../../../types/Sak';
import { TimerEllerProsent } from '../../../../types/TimerEllerProsent';
import { getArbeidAktivitetNavn } from '../../../../utils/arbeidAktivitetUtils';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
import ArbeidstidInput from './ArbeidstidInput';
import { ArbeidIPeriodeIntlValues, getArbeidstidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';

interface ArbeidIPeriodeTimer {
    periode: DateRange;
    timer: number;
}
interface ArbeidIPeriodeProsent {
    periode: DateRange;
    prosent: number;
}
export type ArbeidPeriodeData = ArbeidIPeriodeTimer | ArbeidIPeriodeProsent;

interface Props {
    arbeidsuke: Arbeidsuke;
    arbeidAktivitet: ArbeidAktivitet;
    onSubmit: (endring: ArbeidstidAktivitetUkeEndring) => void;
    onCancel: () => void;
}

const { RadioGroup, FormikWrapper, Form } = getTypedFormComponents<
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    ValidationError
>();

const ArbeidIPeriodeForm: React.FunctionComponent<Props> = ({ arbeidAktivitet, arbeidsuke, onSubmit, onCancel }) => {
    const intl = useIntl();

    const onFormSubmit = (values: ArbeidIPeriodeFormValues) => {
        const { periode } = arbeidsuke;

        if (!periode) {
            return;
        }
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            onSubmit({
                arbeidAktivitetId: arbeidAktivitet.id,
                periode,
                endring: {
                    type: TimerEllerProsent.PROSENT,
                    prosent: parseFloat(values.prosentAvNormalt),
                },
            });
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER && values.snittTimerPerUke) {
            onSubmit({
                arbeidAktivitetId: arbeidAktivitet.id,
                periode,
                endring: {
                    type: TimerEllerProsent.TIMER,
                    timer: parseFloat(values.snittTimerPerUke),
                },
            });
        }
    };

    return (
        <FormikWrapper
            initialValues={{}}
            onSubmit={onFormSubmit}
            renderForm={({ values }) => {
                const { timerEllerProsent } = values;
                const timerNormaltString = intlHelper(intl, 'arbeidstidPeriode.timer', {
                    timer: intl.formatNumber(durationToDecimalDuration(arbeidsuke.normalt), {
                        maximumFractionDigits: 2,
                    }),
                });
                const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
                    timerNormaltString,
                    arbeidsforhold: {
                        type: arbeidAktivitet.type,
                        arbeidsstedNavn: getArbeidAktivitetNavn(arbeidAktivitet),
                    },
                });
                return (
                    <Form
                        formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidIPeriodeForm')}
                        includeValidationSummary={true}
                        submitButtonLabel="Ok"
                        cancelButtonLabel="Avbryt"
                        onCancel={onCancel}
                        showButtonArrows={false}>
                        <FormBlock>
                            <RadioGroup
                                name={ArbeidIPeriodeFormField.timerEllerProsent}
                                legend={intlHelper(intl, `arbeidIPeriode.timerEllerProsent.spm`, intlValues)}
                                radios={getTimerEllerProsentRadios(intl, intlValues)}
                            />
                        </FormBlock>

                        {timerEllerProsent && (
                            <ArbeidstidInput
                                arbeidIPeriode={values}
                                intlValues={intlValues}
                                timerEllerProsent={timerEllerProsent}
                                maksTimer={durationToDecimalDuration(arbeidsuke.normalt)}
                            />
                        )}
                    </Form>
                );
            }}
        />
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
