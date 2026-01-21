import { useOnValidSubmit, useSøknadContext } from '@hooks';
import { Alert, Link, VStack } from '@navikt/ds-react';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { ArbeiderIPeriodenSvar, ArbeidsaktivitetType, ArbeidstidEndringMap, SøknadContextState } from '@types';
import { getArbeidsaktiviteterForUkjenteArbeidsforhold } from '@utils';
import { useIntl } from 'react-intl';

import { AppText } from '../../../i18n';
import { getLenker } from '../../../lenker';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import ArbeidsaktivitetFormPart from './arbeidsaktivitet-form-part/ArbeidsaktivitetFormPart';
import {
    getAktiviteterSomSkalEndres,
    getArbeidstidSøknadsdataFromFormValues,
    getArbeidstidStepInitialValues,
} from './arbeidstidStepUtils';

const { FormikWrapper, Form } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

export type ArbeidsaktivitetFormValuesMap = {
    [aktivitetId: string]: ArbeidsaktivitetFormValues;
};

export interface ArbeidstidFormValues {
    [ArbeidstidFormFields.arbeidsaktivitet]: ArbeidsaktivitetFormValuesMap;
}
export interface ArbeidsaktivitetFormValues {
    endringer: ArbeidstidEndringMap;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    /** Gjelder for frilans, og er kun for å veileder bruker etter praksisendring mai 2025 */
    mottarOmsorgsstønad?: YesOrNo;
}

export enum ArbeidstidFormFields {
    arbeidsaktivitet = 'arbeidsaktivitet',
}

interface Props {
    goBack?: () => void;
}

const ArbeidstidForm = ({ goBack }: Props) => {
    const stepId = StepId.ARBEIDSTID;
    const intl = useIntl();
    const {
        dispatch,
        state: { søknadsdata, sak },
    } = useSøknadContext();
    const { clearStepFormValues, stepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: ArbeidstidFormValues) => {
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(values);
        if (arbeidstidSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        },
    );

    const onArbeidstidAktivitetChange = (
        arbeidsaktivitetKey: string,
        arbeidstidEndringMap: ArbeidstidEndringMap,
        values: Partial<ArbeidstidFormValues>,
        setValues: (values: ArbeidstidFormValues) => void,
    ) => {
        const currentAktivitetValues = (values.arbeidsaktivitet || {})[arbeidsaktivitetKey];

        const newValues: ArbeidstidFormValues = {
            arbeidsaktivitet: {
                ...values.arbeidsaktivitet,
                [arbeidsaktivitetKey]: {
                    arbeiderIPerioden: currentAktivitetValues?.arbeiderIPerioden,
                    endringer: arbeidstidEndringMap,
                    mottarOmsorgsstønad: currentAktivitetValues?.mottarOmsorgsstønad,
                },
            },
        };

        setValues(newValues);

        /** Oppdater state før mellomlagring */
        const arbeidstidSøknadsdata = getArbeidstidSøknadsdataFromFormValues(newValues);
        if (arbeidstidSøknadsdata) {
            dispatch(actionsCreator.setSøknadArbeidstid(arbeidstidSøknadsdata));
            dispatch(actionsCreator.requestLagreSøknad());
        }
    };
    return (
        <FormikWrapper
            initialValues={getArbeidstidStepInitialValues(søknadsdata, stepFormValues?.arbeidstid)}
            onSubmit={handleSubmit}
            renderForm={({ setValues, values, validateForm }) => {
                const aktiviteterValuesMap = values.arbeidsaktivitet || {};
                const arbeidsaktiviteter = [
                    ...getArbeidsaktiviteterForUkjenteArbeidsforhold(
                        sak.søknadsperioder,
                        sak.arbeidsgivereIkkeISak,
                        aktiviteterValuesMap,
                        søknadsdata.ukjentArbeidsforhold,
                    ),
                    ...getAktiviteterSomSkalEndres(sak.arbeidsaktiviteter),
                ];

                if (arbeidsaktiviteter.length === 0) {
                    return (
                        <Alert variant="warning">
                            <AppText
                                id="arbeidstidStep.ingenArbeidsaktiviteter"
                                values={{
                                    Lenke: (txt: string) => (
                                        <Link href={getLenker(intl.locale).skrivTilOss}>{txt}</Link>
                                    ),
                                }}
                            />
                        </Alert>
                    );
                }

                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidstidForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            <VStack gap="space-16">
                                {arbeidsaktiviteter.map((arbeidsaktivitet) => (
                                    <ArbeidsaktivitetFormPart
                                        key={arbeidsaktivitet.key}
                                        arbeidsaktivitet={arbeidsaktivitet}
                                        lovbestemtFerie={søknadsdata.lovbestemtFerie}
                                        aktivitetFormValues={(values.arbeidsaktivitet || {})[arbeidsaktivitet.key]}
                                        onArbeidstidChange={(arbeidstidEndringer) => {
                                            onArbeidstidAktivitetChange(
                                                arbeidsaktivitet.key,
                                                arbeidstidEndringer,
                                                values,
                                                setValues,
                                            );
                                            setTimeout(() => {
                                                validateForm();
                                            });
                                        }}
                                        renderAsExpansionCard={arbeidsaktiviteter.length > 1}
                                        expansionCardDefaultOpen={
                                            arbeidsaktiviteter.length <= 2 ||
                                            (arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker &&
                                                arbeidsaktivitet.erUkjentArbeidsforhold === true)
                                        }
                                    />
                                ))}
                            </VStack>
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default ArbeidstidForm;
