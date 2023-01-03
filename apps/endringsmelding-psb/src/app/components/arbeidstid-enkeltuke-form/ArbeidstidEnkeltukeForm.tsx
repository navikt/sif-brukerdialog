import { ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { getDurationString } from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
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
import { getArbeidstidEnkeltukeIntlValues } from './arbeidstidEnkeltukeIntlValuesUtils';

export enum ArbeidEnkeltukeFormField {
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    snittTimerPerUke = 'snittTimerPerUke',
}

export interface ArbeidEnkeltukeFormValues {
    [ArbeidEnkeltukeFormField.timerEllerProsent]?: TimerEllerProsent;
    [ArbeidEnkeltukeFormField.prosentAvNormalt]?: string;
    [ArbeidEnkeltukeFormField.snittTimerPerUke]?: string;
}

interface Props {
    arbeidsuke: Arbeidsuke;
    arbeidAktivitet: ArbeidAktivitet;
    onSubmit: (endring: ArbeidstidAktivitetUkeEndring) => void;
    onCancel: () => void;
}

const { FormikWrapper, Form, NumberInput } = getTypedFormComponents<
    ArbeidEnkeltukeFormField,
    ArbeidEnkeltukeFormValues,
    ValidationError
>();

const ArbeidEnkeltukeForm: React.FunctionComponent<Props> = ({ arbeidAktivitet, arbeidsuke, onSubmit, onCancel }) => {
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const intl = useIntl();

    const onFormSubmit = (values: ArbeidEnkeltukeFormValues) => {
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
        <>
            {/* {erHelArbeidsuke(arbeidsuke) === false && (
                <Block margin="l">
                    <Alert variant="info" inline={true}>
                        Ikke hel uke. Oppgi kun arbeidstid som gjelder {getDagerTekst(arbeidsuke.periode)}.
                    </Alert>
                </Block>
            )} */}

            <FormikWrapper
                initialValues={{ timerEllerProsent: inputPreferanser.timerEllerProsent }}
                onSubmit={onFormSubmit}
                renderForm={({ values, setValues }) => {
                    const { timerEllerProsent } = values;

                    const intlValues = getArbeidstidEnkeltukeIntlValues(intl, {
                        timerNormaltString: getDurationString(intl, { duration: arbeidsuke.normalt }),
                        dagerTekst: erHelArbeidsuke(arbeidsuke) ? 'denne uken' : getDagerTekst(arbeidsuke.periode),
                        arbeidsforhold: {
                            type: arbeidAktivitet.type,
                            arbeidsstedNavn: getArbeidAktivitetNavn(arbeidAktivitet),
                        },
                    });

                    const getProsentLabel = () => {
                        return intlHelper(intl, 'arbeidstidEnkeltuke.prosentAvNormalt.spm', intlValues);
                    };

                    const getTimerLabel = () => {
                        return intlHelper(intl, 'arbeidstidEnkeltuke.timerAvNormalt.spm', {
                            ...intlValues,
                        });
                    };
                    return (
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidstidEnkeltukeForm')}
                            includeValidationSummary={true}
                            submitButtonLabel="Ok"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <Block padBottom="m">
                                <strong>Hvordan vil du oppgi arbeidstid?</strong>
                            </Block>
                            <ToggleGroup
                                style={{ minWidth: '50%' }}
                                value={timerEllerProsent}
                                size="small"
                                onChange={(value) => {
                                    dispatch(
                                        actionsCreator.setInputPreferanser({
                                            timerEllerProsent: value as TimerEllerProsent,
                                        })
                                    );
                                    setValues({ ...values, timerEllerProsent: value as TimerEllerProsent });
                                }}>
                                <ToggleGroup.Item value={TimerEllerProsent.TIMER}>I timer</ToggleGroup.Item>
                                <ToggleGroup.Item value={TimerEllerProsent.PROSENT}>I prosent</ToggleGroup.Item>
                            </ToggleGroup>

                            {timerEllerProsent && (
                                <FormBlock paddingBottom="l">
                                    {timerEllerProsent === TimerEllerProsent.PROSENT && (
                                        <NumberInput
                                            className="arbeidstidUkeInput"
                                            name={ArbeidEnkeltukeFormField.prosentAvNormalt}
                                            label={getProsentLabel()}
                                            data-testid="prosent-verdi"
                                            width="xs"
                                            maxLength={4}
                                            validate={(value) => {
                                                return getNumberValidator({
                                                    min: 0,
                                                    max: 100,
                                                })(value);
                                            }}
                                        />
                                    )}
                                    {timerEllerProsent === TimerEllerProsent.TIMER && (
                                        <NumberInput
                                            className="arbeidstidUkeInput"
                                            name={ArbeidEnkeltukeFormField.snittTimerPerUke}
                                            label={getTimerLabel()}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            maxLength={4}
                                            validate={(value) => {
                                                return getNumberValidator({
                                                    min: 0,
                                                    max: durationToDecimalDuration(arbeidsuke.normalt),
                                                })(value);
                                            }}
                                        />
                                    )}
                                </FormBlock>
                            )}
                        </Form>
                    );
                }}
            />
        </>
    );
};

export default ArbeidEnkeltukeForm;
