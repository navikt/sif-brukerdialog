import { Alert, BodyShort, Heading, Ingress, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { getDurationString } from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
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
import { DateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidstidEndring } from '../../types/ArbeidstidEndring';
import { Arbeidsuke } from '../../types/Sak';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import {
    arbeidsukerHarLikNormaltidPerDag,
    erHelArbeidsuke,
    getArbeidsukeUkenummer,
    getDagerTekst,
} from '../../utils/arbeidsukeUtils';
import { getFeriedagerIUke } from '../arbeidstid-uke-liste/ArbeidstidUkeTabell';
import DagerMedFerieTags from '../arbeidstid-uke-liste/components/FeriedagerTags';
import { getArbeidstidSpørsmålDescription, getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';
import './endreArbeidstidForm.scss';

export type EndreArbeidstidData = {
    perioder: DateRange[];
    endring: ArbeidstidEndring;
};

export interface EndreArbeidstidFormProps {
    arbeidsuker: Arbeidsuke[];
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
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
    onCancel,
    onSubmit,
    arbeidsuker,
    lovbestemtFerie,
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

    const gjelderKortUke = arbeidsuker.length === 1 && erHelArbeidsuke(arbeidsuker[0].periode) === false;

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
                                                intlValues
                                            )}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            description={getNormalarbeidstidDescription(intl, arbeidsuker)}
                                            maxLength={5}
                                            validate={(value) => {
                                                return getNumberValidator({
                                                    required: true,
                                                    min: 0,
                                                    max: 24 * 7,
                                                })(value);
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
            ? getFeriedagerIUke(lovbestemtFerie.perioderMedFerie, arbeidsuker[0].periode)
            : [];
        const dagerMedFjernetFerie = lovbestemtFerie
            ? getFeriedagerIUke(lovbestemtFerie.perioderFjernet, arbeidsuker[0].periode)
            : [];
        return (
            <BodyShort as="div" className="capsFirstChar">
                {getArbeidstidSpørsmålDescription(arbeidsuker[0], true)}
                {dagerMedFerie.length > 0 && (
                    <DagerMedFerieTags dagerMedFerie={dagerMedFerie} dagerMedFjernetFerie={dagerMedFjernetFerie} />
                )}
            </BodyShort>
        );
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
        const gjelderKortUke = erHelArbeidsuke(uke.periode) === false;
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
