import { ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { getDurationString } from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { getNumberFromStringInput } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import { durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidstidAktivitetUkeEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { ArbeidAktivitet } from '../../types/Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
import { erHelArbeidsuke, getDagerTekst } from '../../utils/arbeidsukeUtils';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
import ArbeidstidInput from './ArbeidstidInput';
import { getArbeidstidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

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
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

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
            initialValues={{ timerEllerProsent: inputPreferanser.timerEllerProsent }}
            onSubmit={onFormSubmit}
            renderForm={({ values, setValues }) => {
                const { timerEllerProsent } = values;

                const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
                    timerNormaltString: getDurationString(intl, { duration: arbeidsuke.normalt }),
                    dagerTekst: erHelArbeidsuke(arbeidsuke) ? 'denne uken' : getDagerTekst(arbeidsuke.periode),
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
                        <Block>
                            <p>
                                <strong>Hvordan vil du oppgi arbeidstid?</strong>
                            </p>
                        </Block>
                        <ToggleGroup
                            value={timerEllerProsent}
                            onChange={(value) => {
                                dispatch(
                                    actionsCreator.setInputPreferanser({
                                        timerEllerProsent: value as TimerEllerProsent,
                                    })
                                );
                                setValues({ ...values, timerEllerProsent: value as TimerEllerProsent });
                            }}>
                            <ToggleGroup.Item value={TimerEllerProsent.TIMER}>Timer</ToggleGroup.Item>
                            <ToggleGroup.Item value={TimerEllerProsent.PROSENT}>Prosent</ToggleGroup.Item>
                        </ToggleGroup>

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
