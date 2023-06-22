import { Button } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import {
    FormikNumberInput,
    FormikYesOrNoQuestion,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ArbeidsaktivitetType, Arbeidsgiver, SøknadContextState, UkjentArbeidsforholdSøknadsdata } from '@types';
import ArbeidsaktivitetBlock from '../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import IkkeAnsattMelding from '../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { InfoNormalarbeidstid } from '../../../components/info-normalarbeidstid/InfoNormalarbeidstid';
import { useOnValidSubmit } from '../../../hooks';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import {
    getErAnsattValidator,
    getTimerPerUkeValidator,
    getUkjentArbeidsforholdStepInitialValues,
    getUkjentArbeidsforholdSøknadsdataFromFormValues,
} from './ukjentArbeidsforholdStepUtils';

export enum UkjentArbeidsgiverFormField {
    erAnsatt = 'erAnsatt',
    timerPerUke = 'timerPerUke',
}

export interface UkjentArbeidsgiverFormValues {
    [UkjentArbeidsgiverFormField.erAnsatt]?: YesOrNo;
    [UkjentArbeidsgiverFormField.timerPerUke]?: string;
}

export interface UkjentArbeidsgiverMap {
    [arbeidsgiverKey: string]: UkjentArbeidsgiverFormValues;
}

export interface UkjentArbeidsforholdFormValues {
    [UkjentArbeidsforholdFormFields.arbeidsforhold]: UkjentArbeidsgiverMap;
}

enum UkjentArbeidsforholdFormFields {
    arbeidsforhold = 'arbeidsforhold',
    ['arbeidsforhold.erAnsatt'] = 'erAnsatt',
    ['arbeidsforhold.timerPerUke'] = 'timerPerUke',
}

const { FormikWrapper, Form } = getTypedFormComponents<
    UkjentArbeidsforholdFormFields,
    UkjentArbeidsforholdFormValues,
    ValidationError
>();

interface Props {
    arbeidsgivere: Arbeidsgiver[];
    ukjenteArbeidsgivere: Arbeidsgiver[];
    ukjentArbeidsforholdSøknadsdata?: UkjentArbeidsforholdSøknadsdata;
    tempFormValues?: Partial<UkjentArbeidsforholdFormValues>;
    stepId: StepId;
    goBack?: () => void;
}

const UkjentArbeidsforholdForm: React.FunctionComponent<Props> = ({
    stepId,
    goBack,
    arbeidsgivere,
    ukjenteArbeidsgivere,
    ukjentArbeidsforholdSøknadsdata,
    tempFormValues,
}) => {
    const intl = useIntl();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: UkjentArbeidsforholdFormValues) => {
        const ukjentArbeidsforholdSøknadsdata = getUkjentArbeidsforholdSøknadsdataFromFormValues(values, arbeidsgivere);
        if (ukjentArbeidsforholdSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadUkjentArbeidsforhold(ukjentArbeidsforholdSøknadsdata)];
        }
        return [];
    };

    const { persistTempFormValues } = usePersistTempFormValues();

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    const initialValues: Partial<UkjentArbeidsforholdFormValues> = getUkjentArbeidsforholdStepInitialValues(
        ukjentArbeidsforholdSøknadsdata,
        tempFormValues || stepFormValues?.ukjentArbeidsforhold,
        ukjenteArbeidsgivere
    );

    return (
        <FormikWrapper
            initialValues={initialValues}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                return (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'ukjentArbeidsforholdForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            {ukjenteArbeidsgivere.map((arbeidsgiver) => {
                                const arbeidsgiverFieldName = `${UkjentArbeidsforholdFormFields.arbeidsforhold}.${arbeidsgiver.key}`;
                                const arbeidsgiverValues = (values.arbeidsforhold || {})[arbeidsgiver.key];
                                return (
                                    <FormBlock
                                        key={arbeidsgiver.key}
                                        data-testid={`ukjentArbeidsforhold_${arbeidsgiver.key}`}>
                                        <ArbeidsaktivitetBlock
                                            type={ArbeidsaktivitetType.arbeidstaker}
                                            navn={arbeidsgiver.navn}
                                            arbeidsgiver={arbeidsgiver}
                                            renderAsExpansionCard={false}>
                                            <FormikYesOrNoQuestion
                                                name={`${arbeidsgiverFieldName}.${UkjentArbeidsgiverFormField.erAnsatt}`}
                                                validate={getErAnsattValidator(arbeidsgiver.navn)}
                                                legend={`Stemmer det at du er ansatt hos ${arbeidsgiver.navn} i perioden du har søkt pleiepenger?`}
                                            />
                                            {arbeidsgiverValues.erAnsatt === YesOrNo.NO && (
                                                <Block margin="l" padBottom="l">
                                                    <IkkeAnsattMelding />
                                                </Block>
                                            )}
                                            {arbeidsgiverValues.erAnsatt === YesOrNo.YES && (
                                                <FormBlock>
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            persistTempFormValues({
                                                                stepId: StepId.UKJENT_ARBEIDSFOHOLD,
                                                                values,
                                                            })
                                                        }>
                                                        Lagre formValues
                                                    </Button>
                                                    <FormikNumberInput
                                                        name={`${arbeidsgiverFieldName}.${UkjentArbeidsgiverFormField.timerPerUke}`}
                                                        label={`Hvor mange timer jobber du normalt per uke hos ${arbeidsgiver.navn}?`}
                                                        description={<InfoNormalarbeidstid />}
                                                        min={0}
                                                        max={100}
                                                        width="xs"
                                                        maxLength={5}
                                                        validate={getTimerPerUkeValidator(arbeidsgiver.navn)}
                                                    />
                                                </FormBlock>
                                            )}
                                        </ArbeidsaktivitetBlock>
                                    </FormBlock>
                                );
                            })}
                        </Form>
                    </>
                );
            }}
        />
    );
};

export default UkjentArbeidsforholdForm;
