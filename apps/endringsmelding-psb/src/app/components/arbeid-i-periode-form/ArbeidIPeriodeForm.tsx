import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidAktivitetUkeEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
import ArbeidstidInput from './ArbeidstidInput';
import { getArbeidstidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';
import { getNumberFromStringInput } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import { Tabs } from '@navikt/ds-react';
import { Clock } from '@navikt/ds-icons';

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

const { FormikWrapper, Form } = getTypedFormComponents<
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
            const timer = getNumberFromStringInput(values.snittTimerPerUke);
            if (!timer) {
                /** TODO */
                return;
            }
            onSubmit({
                arbeidAktivitetId: arbeidAktivitet.id,
                periode,
                endring: {
                    type: TimerEllerProsent.TIMER,
                    timer,
                },
            });
        }
    };

    return (
        <FormikWrapper
            initialValues={{ timerEllerProsent: TimerEllerProsent.PROSENT }}
            onSubmit={onFormSubmit}
            renderForm={({ values, setValues }) => {
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
                        <Tabs
                            value={timerEllerProsent}
                            onChange={(value) => {
                                setValues({ ...values, timerEllerProsent: value as TimerEllerProsent });
                            }}>
                            <Tabs.List>
                                <Tabs.Tab
                                    value="prosent"
                                    label="Endre prosent"
                                    icon={<div style={{ minWidth: '1rem', textAlign: 'center' }}>%</div>}
                                />
                                <Tabs.Tab value="timer" label="Endre timer" icon={<Clock />} />
                            </Tabs.List>
                        </Tabs>
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
