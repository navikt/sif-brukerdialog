import { Alert, BodyShort, Heading, Ingress, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getDurationString } from '@navikt/sif-common-core-ds/src/components/duration-text/DurationText';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    getNumberFromNumberInputValue,
    getTypedFormComponents,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeidstidEndring, Arbeidsuke, LovbestemtFerieSøknadsdata, TimerEllerProsent } from '@types';
import {
    arbeidsukerHarLikNormaltidPerDag,
    erKortArbeidsuke,
    getArbeidsukeUkenummer,
    getDagerTekst,
    getFeriedagerIUke,
    getFeriedagerIUkeTekst,
} from '@utils';
import dayjs from 'dayjs';
import actionsCreator from '../../søknad/context/action/actionCreator';
import UkeTags from '../arbeidstid-uker/components/UkeTags';
import { getArbeidstidSpørsmålDescription, getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';
import './endreArbeidstidForm.scss';

type EndreArbeidstidData = {
    perioder: DateRange[];
    endring: ArbeidstidEndring;
};

export interface EndreArbeidstidFormProps {
    arbeidsuker: Arbeidsuke[];
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    endring?: ArbeidstidEndring;
    onSubmit: (data: EndreArbeidstidData) => void;
    onCancel: () => void;
}

export enum EndreArbeidstidFormField {
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    antallTimer = 'antallTimer',
}

export interface EndreArbeidstidFormValues {
    [EndreArbeidstidFormField.timerEllerProsent]?: TimerEllerProsent;
    [EndreArbeidstidFormField.prosentAvNormalt]?: string;
    [EndreArbeidstidFormField.antallTimer]?: string;
}

const { FormikWrapper, Form, NumberInput } = getTypedFormComponents<
    EndreArbeidstidFormField,
    EndreArbeidstidFormValues,
    ValidationError
>();

const EndreArbeidstidForm: React.FunctionComponent<EndreArbeidstidFormProps> = ({
    arbeidsuker,
    lovbestemtFerie,
    endring,
    onCancel,
    onSubmit,
}) => {
    const intl = useIntl();
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const onFormSubmit = (values: EndreArbeidstidFormValues) => {
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            const value = getNumberFromNumberInputValue(values.prosentAvNormalt);
            if (value !== undefined) {
                onSubmit({
                    perioder: arbeidsuker.map((a) => a.periode),
                    endring: {
                        type: TimerEllerProsent.PROSENT,
                        prosent: value,
                    },
                });
            }
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER) {
            const antallTimer = getNumberFromNumberInputValue(values.antallTimer);
            if (antallTimer !== undefined) {
                const perioder = arbeidsuker.map((uke) => uke.periode);
                onSubmit({
                    perioder,
                    endring: {
                        type: TimerEllerProsent.TIMER,
                        timer: antallTimer,
                    },
                });
            }
        }
    };

    if (arbeidsuker.length === 0) {
        return null;
    }

    const dagerMedFjernetFerie = lovbestemtFerie
        ? getFeriedagerIUke(lovbestemtFerie.feriedagerMeta.datoerFjernet, arbeidsuker[0].periode, true)
        : [];

    const gjelderKortUke = arbeidsuker.length === 1 && erKortArbeidsuke(arbeidsuker[0].periode);

    const getMaksTimer = () => {
        const antallDager = arbeidsuker.length === 1 ? arbeidsuker[0].antallDagerMedArbeidstid : 7;
        return 24 * antallDager;
    };

    const getInitialValues = (): EndreArbeidstidFormValues => {
        if (endring?.type === TimerEllerProsent.PROSENT) {
            return {
                timerEllerProsent: TimerEllerProsent.PROSENT,
                prosentAvNormalt: `${endring.prosent}`,
            };
        }
        if (endring?.type === TimerEllerProsent.TIMER) {
            return {
                timerEllerProsent: TimerEllerProsent.TIMER,
                antallTimer: `${endring.timer}`,
            };
        }
        return { timerEllerProsent: inputPreferanser.timerEllerProsent };
    };
    return (
        <FormikWrapper
            initialValues={getInitialValues()}
            onSubmit={onFormSubmit}
            renderForm={({ values, setValues }) => {
                const { timerEllerProsent } = values;
                const intlValues = getEndreArbeidstidIntlValues({
                    arbeidsuker,
                });

                return (
                    <div className="endreArbeidstidForm">
                        <Block margin="l" padBottom="l">
                            <Heading size="large" level="2">
                                {arbeidsuker.length === 1
                                    ? `Endre jobb for uke ${getArbeidsukeUkenummer(arbeidsuker[0], true)}`
                                    : 'Endre jobb for flere uker'}
                            </Heading>
                            <Block margin="m">
                                <Ingress as="div">{getUkerOgÅrBeskrivelse(arbeidsuker, lovbestemtFerie)}</Ingress>
                            </Block>
                        </Block>

                        {dagerMedFjernetFerie && dagerMedFjernetFerie.length > 0 && (
                            <Block margin="s" padBottom="l">
                                <Alert variant="warning">
                                    Du har fjernet ferie ({getFeriedagerIUkeTekst(dagerMedFjernetFerie)}) denne uken.
                                    Hvis du skal jobbe i stedet for ferie, oppgi hvor mye du jobber denne uken.
                                </Alert>
                            </Block>
                        )}
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'endreArbeidstidForm')}
                            includeValidationSummary={true}
                            submitButtonLabel="Ok"
                            cancelButtonLabel="Avbryt"
                            onCancel={onCancel}
                            showButtonArrows={false}>
                            <Block padBottom="m">
                                <strong>Hvordan vil du oppgi hvor mye du jobber?</strong>
                            </Block>
                            <ToggleGroup
                                className="endreArbeidstidForm__timerProsentToggler"
                                value={timerEllerProsent}
                                size="small"
                                onChange={(value) => {
                                    dispatch(
                                        actionsCreator.setInputPreferanser({
                                            timerEllerProsent: value as TimerEllerProsent,
                                        }),
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

                            {gjelderKortUke && (
                                <Block margin="xl">
                                    <Alert variant="info" inline={false}>
                                        Dette er en kort uke, som går fra {getDagerTekst(arbeidsuker[0].periode)}. Du
                                        skal oppgi hvor mye du jobber kun for disse dagene.
                                    </Alert>
                                </Block>
                            )}

                            <FormBlock paddingBottom="l">
                                {timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <NumberInput
                                        className="arbeidstidUkeInput"
                                        name={EndreArbeidstidFormField.prosentAvNormalt}
                                        label={intlHelper(intl, 'endreArbeidstid.prosentAvNormalt.spm', intlValues)}
                                        data-testid="prosent-verdi"
                                        width="xs"
                                        description={getNormalarbeidstidDescription(intl, arbeidsuker)}
                                        maxLength={5}
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
                                    <>
                                        <NumberInput
                                            className="arbeidstidUkeInput"
                                            name={EndreArbeidstidFormField.antallTimer}
                                            label={intlHelper(
                                                intl,
                                                arbeidsuker.length === 1
                                                    ? `endreArbeidstid.timerAvNormalt.spm`
                                                    : `endreArbeidstid.timerAvNormalt.flereUker.spm`,
                                                intlValues,
                                            )}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            description={getNormalarbeidstidDescription(intl, arbeidsuker)}
                                            maxLength={5}
                                            validate={(value) => {
                                                const max = getMaksTimer();
                                                const error = getNumberValidator({
                                                    required: true,
                                                    min: 0,
                                                    max,
                                                })(value);
                                                return error ? { key: error, values: { maksTimer: max } } : undefined;
                                            }}
                                        />
                                    </>
                                )}
                            </FormBlock>
                        </Form>
                    </div>
                );
            }}
        />
    );
};

export default EndreArbeidstidForm;

const getUkerOgÅrBeskrivelse = (arbeidsuker: Arbeidsuke[], lovbestemtFerie?: LovbestemtFerieSøknadsdata) => {
    if (arbeidsuker.length === 1) {
        const dagerMedFerie = lovbestemtFerie
            ? getFeriedagerIUke(lovbestemtFerie.feriedagerMeta.datoerMedFerie, arbeidsuker[0].periode, true)
            : [];
        return (
            <BodyShort as="div" className="capsFirstChar">
                {getArbeidstidSpørsmålDescription(arbeidsuker[0])}
                {dagerMedFerie.length > 0 && (
                    <Block margin="m">
                        <UkeTags visDagNavn={true} dagerMedFerie={dagerMedFerie} />
                    </Block>
                )}
            </BodyShort>
        );
    }
    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);
    const getUker = (uker: Arbeidsuke[]) => {
        if (!uker) {
            return 'Ingen uker valgt';
        }
        return uker ? uker.map((uke) => dayjs(uke.periode.from).isoWeek()).join(', ') : [];
    };

    const årKeys = Object.keys(ukerPerÅr);
    return (
        <>
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

const getNormalarbeidstidDescription = (intl: IntlShape, arbeidsuker: Arbeidsuke[]) => {
    if (arbeidsuker.length === 1) {
        const uke = arbeidsuker[0];
        const gjelderKortUke = erKortArbeidsuke(uke.periode);
        const periodeTekst = gjelderKortUke ? ` ${getDagerTekst(uke.periode)}` : ' denne uken';
        return `Oppgitt normal arbeidstid for ${periodeTekst} er ${getDurationString(intl, {
            duration: uke.normalt.uke,
        })}`;
    }
    if (arbeidsukerHarLikNormaltidPerDag(arbeidsuker)) {
        const uke = arbeidsuker[0];
        return `Oppgitt normal arbeidstid for disse ukene er ${getDurationString(intl, {
            duration: uke.normalt.uke,
        })} per uke`;
    }
    return 'Merk: normal arbeidstid er ikke lik for alle disse ukene.';
};
