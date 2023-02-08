import { Heading, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import dayjs from 'dayjs';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidstidAktivitetEndring } from '../../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, Arbeidsuke } from '../../types/Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { getArbeidsukeUkenummer } from '../../utils/arbeidsukeUtils';
import { getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';
import EndreArbeidstimerFormPart from './EndreArbeidstimerFormPart';

export type EndreArbeidstidFormData = Omit<ArbeidstidAktivitetEndring, 'arbeidAktivitetId'>;

interface Props {
    arbeidsuker: Arbeidsuke[];
    arbeidAktivitet: ArbeidAktivitet;
    onSubmit: (data: EndreArbeidstidFormData[]) => void;
    onCancel: () => void;
}

export enum EndreArbeidstidFormField {
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    snittTimerPerUke = 'snittTimerPerUke',
    timerFørsteUke = 'timerFørsteUke',
    timerSisteUke = 'timerSisteUke',
}

export interface EndreArbeidstidFormValues {
    [EndreArbeidstidFormField.timerEllerProsent]?: TimerEllerProsent;
    [EndreArbeidstidFormField.prosentAvNormalt]?: string;
    [EndreArbeidstidFormField.snittTimerPerUke]?: string;
}

const { FormikWrapper, Form, NumberInput } = getTypedFormComponents<
    EndreArbeidstidFormField,
    EndreArbeidstidFormValues,
    ValidationError
>();

const EndreArbeidstidForm: React.FunctionComponent<Props> = ({ onCancel, onSubmit, arbeidsuker, arbeidAktivitet }) => {
    const intl = useIntl();
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const onFormSubmit = (values: EndreArbeidstidFormValues) => {
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            const value = getNumberFromNumberInputValue(values.prosentAvNormalt);
            if (value) {
                onSubmit([
                    {
                        perioder: arbeidsuker.map((a) => a.periode),
                        endring: {
                            type: TimerEllerProsent.PROSENT,
                            prosent: value,
                        },
                    },
                ]);
            }
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER) {
            const timerFørsteUke = getNumberFromNumberInputValue(values[EndreArbeidstidFormField.timerFørsteUke]);
            const timerSisteUke = getNumberFromNumberInputValue(values[EndreArbeidstidFormField.timerSisteUke]);
            const timerSnitt = getNumberFromNumberInputValue(values.snittTimerPerUke);

            const endringer: EndreArbeidstidFormData[] = [];
            if (timerFørsteUke) {
                endringer.push({
                    perioder: [arbeidsuker[0].periode],
                    endring: {
                        type: TimerEllerProsent.TIMER,
                        timer: timerFørsteUke,
                    },
                });
            }
            if (timerSisteUke) {
                endringer.push({
                    perioder: [arbeidsuker[arbeidsuker.length - 1].periode],
                    endring: {
                        type: TimerEllerProsent.TIMER,
                        timer: timerSisteUke,
                    },
                });
            }
            if (timerSnitt) {
                const perioder = arbeidsuker
                    .filter((_, index) => {
                        if ((index === 0 && timerFørsteUke) || (index === arbeidsuker.length - 1 && timerSisteUke)) {
                            return false;
                        }
                        return true;
                    })
                    .map((uke) => uke.periode);
                endringer.push({
                    perioder,
                    endring: {
                        type: TimerEllerProsent.TIMER,
                        timer: timerSnitt,
                    },
                });
            }
            onSubmit(endringer);
        }
    };

    if (arbeidsuker.length === 0) {
        return null;
    }
    return (
        <FormikWrapper
            initialValues={{ timerEllerProsent: inputPreferanser.timerEllerProsent }}
            onSubmit={onFormSubmit}
            renderForm={({ values, setValues }) => {
                const { timerEllerProsent } = values;

                const intlValues = getEndreArbeidstidIntlValues({
                    arbeidsuker,
                });

                return (
                    <>
                        <Block margin="l">
                            <Heading size="large" level="2">
                                {arbeidsuker.length === 1
                                    ? `Endre arbeidstid uke ${getArbeidsukeUkenummer(arbeidsuker[0], true)}`
                                    : 'Endre arbeidstid for flere uker'}
                            </Heading>
                        </Block>

                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endreArbeidstidForm')}
                            includeValidationSummary={true}
                            submitButtonLabel="Ok"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <Block padBottom="m">
                                <strong>Hvordan vil du oppgi arbeidstiden?</strong>
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
                                <ToggleGroup.Item value={TimerEllerProsent.PROSENT} data-testid="toggle-prosent">
                                    I prosent
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value={TimerEllerProsent.TIMER} data-testid="toggle-timer">
                                    I timer
                                </ToggleGroup.Item>
                            </ToggleGroup>

                            {timerEllerProsent && (
                                <FormBlock paddingBottom="l">
                                    {timerEllerProsent === TimerEllerProsent.PROSENT && (
                                        <NumberInput
                                            className="arbeidstidUkeInput"
                                            name={EndreArbeidstidFormField.prosentAvNormalt}
                                            label={intlHelper(intl, 'endreArbeidstid.prosentAvNormalt.spm', intlValues)}
                                            description={getProsentDescription(arbeidsuker)}
                                            data-testid="prosent-verdi"
                                            width="xs"
                                            maxLength={4}
                                            validate={(value) => {
                                                return getNumberValidator({
                                                    required: true,
                                                    min: 0,
                                                    max: 100,
                                                })(value);
                                            }}
                                        />
                                    )}
                                    {timerEllerProsent === TimerEllerProsent.TIMER && (
                                        <EndreArbeidstimerFormPart
                                            intlValues={intlValues}
                                            arbeidsuker={arbeidsuker}
                                            arbeidAktivitet={arbeidAktivitet}
                                        />
                                    )}
                                </FormBlock>
                            )}
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default EndreArbeidstidForm;

const getProsentDescription = (arbeidsuker: Arbeidsuke[]) => {
    if (arbeidsuker.length === 1) {
        return undefined;
    }
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);

    const getUker = (uker: Arbeidsuke[]) => {
        if (!uker) {
            // eslint-disable-next-line no-console
            return 'Ingen uker valgt';
        }
        return uker ? uker.map((uke) => dayjs(uke.periode.from).isoWeek()).join(', ') : [];
    };

    const årKeys = Object.keys(ukerPerÅr);

    // const ikkeFulleUker = arbeidsuker.find((uke) => uke.antallDagerMedArbeidstid < 5);

    return (
        <>
            {/* {ikkeFulleUker && (
                <BodyShort>
                    Noen av ukene du har valgt er ikke hele uker (mandag - søndag). Da skal du oppgi hvor mange prosent
                    du jobber disse dagene, og ikke tenke på de andre dagene.
                </BodyShort>
            )} */}
            <Block margin="m">
                <ExpandableInfo title={`Vis hvilke ${arbeidsuker.length} uker som er valgt`}>
                    {årKeys.map((år) => {
                        return <div key={år}>{`${år}: Uke ${getUker(ukerPerÅr[år])}`}</div>;
                    })}
                </ExpandableInfo>
            </Block>
        </>
    );
};
