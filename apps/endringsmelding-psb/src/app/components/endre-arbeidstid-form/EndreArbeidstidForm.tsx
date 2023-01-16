import { Alert, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { getNumberFromStringInput } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import dayjs from 'dayjs';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidstidAktivitetEndring } from '../../types/ArbeidstidAktivitetEndring';
import { Arbeidsuke } from '../../types/K9Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { arbeidsukerErHeleArbeidsuker, arbeidsukerHarLikNormaltidPerDag } from '../../utils/arbeidsukeUtils';
import { getArbeidsukerPerÅr } from './endreArbeidstidFormUtils';
import { getEndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';

export type EndreArbeidstidFormData = Omit<ArbeidstidAktivitetEndring, 'arbeidAktivitetId'>;

interface Props {
    arbeidsuker: Arbeidsuke[];
    onSubmit: (data: EndreArbeidstidFormData) => void;
    onCancel: () => void;
}

export enum EndreArbeidstidFormField {
    timerEllerProsent = 'timerEllerProsent',
    prosentAvNormalt = 'prosentAvNormalt',
    snittTimerPerUke = 'snittTimerPerUke',
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

const EndreArbeidstidForm: React.FunctionComponent<Props> = ({ onCancel, onSubmit, arbeidsuker }) => {
    const intl = useIntl();
    const {
        dispatch,
        state: { inputPreferanser },
    } = useSøknadContext();

    const onFormSubmit = (values: EndreArbeidstidFormValues) => {
        if (values.timerEllerProsent === TimerEllerProsent.PROSENT && values.prosentAvNormalt) {
            onSubmit({
                perioder: arbeidsuker.map((a) => a.periode),
                endring: {
                    type: TimerEllerProsent.PROSENT,
                    prosent: parseFloat(values.prosentAvNormalt),
                },
            });
        }
        if (values.timerEllerProsent === TimerEllerProsent.TIMER && values.snittTimerPerUke) {
            const timer = getNumberFromStringInput(values.snittTimerPerUke);
            if (timer === undefined) {
                /** TODO */
                return;
            }
            onSubmit({
                perioder: arbeidsuker.map((a) => a.periode),
                endring: {
                    type: TimerEllerProsent.TIMER,
                    timer,
                },
            });
        }
    };

    if (arbeidsuker.length === 0) {
        return null;
    }

    const ukerHarLikNormaltidPerDag = arbeidsukerHarLikNormaltidPerDag(arbeidsuker);
    const alleUkerErHeleUker = arbeidsukerErHeleArbeidsuker(arbeidsuker);

    const arbeidsukerDescription = getArbeidsukerDescription(arbeidsuker);

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
                            <ToggleGroup.Item value={TimerEllerProsent.TIMER}>I timer</ToggleGroup.Item>
                            <ToggleGroup.Item value={TimerEllerProsent.PROSENT}>I prosent</ToggleGroup.Item>
                        </ToggleGroup>
                        {timerEllerProsent && (
                            <FormBlock paddingBottom="l">
                                {timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <NumberInput
                                        className="arbeidstidUkeInput"
                                        name={EndreArbeidstidFormField.prosentAvNormalt}
                                        label={intlHelper(intl, 'endreArbeidstid.prosentAvNormalt.spm', intlValues)}
                                        description={arbeidsukerDescription}
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
                                        name={EndreArbeidstidFormField.snittTimerPerUke}
                                        label={intlHelper(intl, 'endreArbeidstid.timerAvNormalt.spm', intlValues)}
                                        data-testid="timer-verdi"
                                        description={arbeidsukerDescription}
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
                            </FormBlock>
                        )}
                        {ukerHarLikNormaltidPerDag === false && alleUkerErHeleUker === false && (
                            <Alert variant="info">
                                Informasjon når noen av ukene ikke er hele arbeidsuker samtidig som det er ulik
                                normalarbeidstid - påminnelse om at bruker må sjekke disse ukene etterpå
                            </Alert>
                        )}
                        {ukerHarLikNormaltidPerDag === false && alleUkerErHeleUker === true && (
                            <Alert variant="info">
                                Informasjon når noen av ukene har ulike normalarbeidstid - påminnelse om at bruker må
                                sjekke disse ukene etterpå
                            </Alert>
                        )}
                        {ukerHarLikNormaltidPerDag === true && alleUkerErHeleUker === false && (
                            <Alert variant="info">
                                Informasjon når noen av ukene ikke er hele arbeidsuker - påminnelse om at bruker må
                                sjekke disse ukene etterpå
                            </Alert>
                        )}
                    </Form>
                );
            }}
        />
    );
};

export default EndreArbeidstidForm;

const getArbeidsukerDescription = (arbeidsuker: Arbeidsuke[]) => {
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

    return (
        <ExpandableInfo title={`Vis hvilke ${arbeidsuker.length} uker som er valgt`}>
            {årKeys.map((år) => {
                return <div key={år}>{`${år}: Uke ${getUker(ukerPerÅr[år])}`}</div>;
            })}
        </ExpandableInfo>
    );
};
