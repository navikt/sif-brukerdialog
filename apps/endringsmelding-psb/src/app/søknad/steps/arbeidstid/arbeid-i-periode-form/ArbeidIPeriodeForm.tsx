import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { ArbeidstidAktivitetEndring } from '../../../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet } from '../../../../types/Sak';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues, TimerEllerProsent } from './ArbeidIPeriodeFormValues';
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
    arbeidsuke?: DateRange;
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsstedNavn: string;
    onSubmit: (endring: ArbeidstidAktivitetEndring) => void;
    onCancel: () => void;
}

const { RadioGroup, FormikWrapper, Form, DateRangePicker } = getTypedFormComponents<
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    ValidationError
>();

export const getPeriodeFraFormValues = (formValues: ArbeidIPeriodeFormValues): DateRange | undefined => {
    const from = datepickerUtils.getDateFromDateString(formValues.periodeFra);
    const to = datepickerUtils.getDateFromDateString(formValues.periodeTil);
    return from && to ? { from, to } : undefined;
};

const ArbeidIPeriodeForm: React.FunctionComponent<Props> = ({
    arbeidAktivitet,
    arbeidsuke,
    arbeidsstedNavn,
    onSubmit,
    onCancel,
}) => {
    const intl = useIntl();

    const onFormSubmit = (values: ArbeidIPeriodeFormValues) => {
        const gjelderEnkeltuke = arbeidsuke !== undefined;
        const periode = gjelderEnkeltuke ? arbeidsuke : getPeriodeFraFormValues(values);

        if (!periode) {
            return;
        }
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            onSubmit({
                gjelderEnkeltuke,
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
                gjelderEnkeltuke,
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
                const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
                    arbeidsforhold: {
                        type: arbeidAktivitet.type,
                        arbeidsstedNavn,
                    },
                    // periode: arbeidsperiode,
                });
                // const valgtPeriode = arbeidsperiode === undefined ? getPeriodeFraFormValues(values) : undefined;
                return (
                    <Form
                        includeValidationSummary={true}
                        submitButtonLabel="Ok"
                        cancelButtonLabel="Avbryt"
                        onCancel={onCancel}
                        showButtonArrows={false}>
                        {arbeidsuke === undefined && (
                            <>
                                <DateRangePicker
                                    legend={intlHelper(intl, 'arbeidIPeriode.periode.tittel')}
                                    fromInputProps={{
                                        label: intlHelper(intl, 'arbeidIPeriode.fraOgMed.label'),
                                        name: ArbeidIPeriodeFormField.periodeFra,
                                        dayPickerProps: {
                                            showWeekNumber: true,
                                        },
                                    }}
                                    toInputProps={{
                                        label: intlHelper(intl, 'arbeidIPeriode.tilOgMed.label'),
                                        name: ArbeidIPeriodeFormField.periodeTil,
                                        dayPickerProps: {
                                            defaultMonth: values?.periodeFra ? new Date(values?.periodeFra) : undefined,
                                            showWeekNumber: true,
                                        },
                                    }}
                                    disableWeekend={false}
                                    fullscreenOverlay={true}
                                    fullScreenOnMobile={true}
                                />
                            </>
                        )}

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
