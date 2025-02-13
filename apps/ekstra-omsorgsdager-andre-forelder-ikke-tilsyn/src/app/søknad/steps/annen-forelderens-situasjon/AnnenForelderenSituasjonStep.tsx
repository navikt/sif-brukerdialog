import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { useStepFormValuesContext } from '../../../søknad/context/StepFormValuesContext';
import { getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { AnnenForeldrenSituasjon, AnnenForeldrenSituasjonType } from '../../../types/AnnenForeldrenSituasjon';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { validateFraDato, validateTextArea, validateTildato } from '../../../validation/fieldValidations';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import {
    getAnnenForelderenSituasjonStepInitialValues,
    getAnnenForelderenSituasjonSøknadsdataFromFormValues,
    isPeriodeLess6month,
} from './annenForelderenSituasjonStepUtils';

export enum AnnenForelderenSituasjonFormFields {
    annenForelderSituasjon = 'annenForelderSituasjon',
    annenForelderSituasjonBeskrivelse = 'annenForelderSituasjonBeskrivelse',
    annenForelderPeriodeFom = 'annenForelderPeriodeFom',
    annenForelderPeriodeTom = 'annenForelderPeriodeTom',
    annenForelderPeriodeVetIkkeTom = 'annenForelderPeriodeVetIkkeTom',
    annenForelderPeriodeMer6Maneder = 'annenForelderPeriodeMer6Maneder',
}

export interface AnnenForelderenSituasjonFormValues {
    [AnnenForelderenSituasjonFormFields.annenForelderSituasjon]?: AnnenForeldrenSituasjon;
    [AnnenForelderenSituasjonFormFields.annenForelderSituasjonBeskrivelse]?: string;
    [AnnenForelderenSituasjonFormFields.annenForelderPeriodeFom]: string;
    [AnnenForelderenSituasjonFormFields.annenForelderPeriodeTom]?: string;
    [AnnenForelderenSituasjonFormFields.annenForelderPeriodeVetIkkeTom]?: boolean;
    [AnnenForelderenSituasjonFormFields.annenForelderPeriodeMer6Maneder]?: YesOrNo;
}

const { FormikWrapper, Form, YesOrNoQuestion, Textarea, DateRangePicker, Checkbox, RadioGroup } =
    getTypedFormComponents<AnnenForelderenSituasjonFormFields, AnnenForelderenSituasjonFormValues, ValidationError>();

const AnnenForelderenSituasjonStep = () => {
    const { intl, text } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.ANNEN_FORELDER_SITUASJON;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: AnnenForelderenSituasjonFormValues) => {
        const AnnenForelderenSituasjonSøknadsdata = getAnnenForelderenSituasjonSøknadsdataFromFormValues(values);
        if (AnnenForelderenSituasjonSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadAnnenForelderenSituasjon(AnnenForelderenSituasjonSøknadsdata)];
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

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getAnnenForelderenSituasjonStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        annenForelderSituasjon,
                        annenForelderPeriodeFom,
                        annenForelderPeriodeTom,
                        annenForelderPeriodeVetIkkeTom,
                        annenForelderPeriodeMer6Maneder,
                    },
                    setFieldValue,
                }) => {
                    const periodeFra = datepickerUtils.getDateFromDateString(annenForelderPeriodeFom);
                    const periodeTil = datepickerUtils.getDateFromDateString(annenForelderPeriodeTom);

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>{text('step.annenForeldrensSituasjon.banner.1')}</SifGuidePanel>

                                <Block margin="xxl">
                                    <RadioGroup
                                        legend={text('step.annenForeldrensSituasjon.grunn.spm')}
                                        name={AnnenForelderenSituasjonFormFields.annenForelderSituasjon}
                                        radios={Object.keys(AnnenForeldrenSituasjon).map(
                                            (grunn: AnnenForeldrenSituasjonType) => {
                                                return {
                                                    label: text(`step.annenForeldrensSituasjon.grunn.${grunn}`),
                                                    value: AnnenForeldrenSituasjon[grunn],
                                                };
                                            },
                                        )}
                                        validate={getRequiredFieldValidator()}
                                        afterOnChange={(newValue) => {
                                            if (
                                                newValue &&
                                                (newValue === AnnenForeldrenSituasjon.fengsel ||
                                                    AnnenForeldrenSituasjon.utøverVerneplikt)
                                            ) {
                                                setFieldValue(
                                                    AnnenForelderenSituasjonFormFields.annenForelderPeriodeVetIkkeTom,
                                                    false,
                                                );
                                            }
                                        }}
                                    />
                                </Block>

                                {(annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
                                    annenForelderSituasjon === AnnenForeldrenSituasjon.annet) && (
                                    <>
                                        {annenForelderSituasjon === AnnenForeldrenSituasjon.annet && (
                                            <FormBlock margin="m">
                                                <Alert variant="info">
                                                    <AppText id="step.annenForeldrensSituasjon.grunn.annet.info" />
                                                </Alert>
                                            </FormBlock>
                                        )}
                                        <FormBlock>
                                            <Textarea
                                                name={
                                                    AnnenForelderenSituasjonFormFields.annenForelderSituasjonBeskrivelse
                                                }
                                                label={text(
                                                    'step.annenForeldrensSituasjon.beskrivelseAvSituasjonen.spm',
                                                )}
                                                minLength={5}
                                                maxLength={1000}
                                                validate={validateTextArea}
                                            />
                                        </FormBlock>
                                    </>
                                )}

                                {annenForelderSituasjon && (
                                    <FormBlock>
                                        <DateRangePicker
                                            legend={text(
                                                `step.annenForeldrensSituasjon.periode.${annenForelderSituasjon}.spm`,
                                            )}
                                            fromInputProps={{
                                                label: text('step.annenForeldrensSituasjon.periode.fra'),
                                                name: AnnenForelderenSituasjonFormFields.annenForelderPeriodeFom,
                                                validate: (value) =>
                                                    validateFraDato(value, periodeTil, annenForelderSituasjon),
                                            }}
                                            toInputProps={{
                                                label: text('step.annenForeldrensSituasjon.periode.til'),
                                                name: AnnenForelderenSituasjonFormFields.annenForelderPeriodeTom,
                                                validate: annenForelderPeriodeVetIkkeTom
                                                    ? undefined
                                                    : (value) =>
                                                          validateTildato(value, periodeFra, annenForelderSituasjon),
                                                inputDisabled: annenForelderPeriodeVetIkkeTom,
                                            }}
                                        />

                                        {annenForelderSituasjon !== AnnenForeldrenSituasjon.fengsel &&
                                            annenForelderSituasjon !== AnnenForeldrenSituasjon.utøverVerneplikt && (
                                                <Checkbox
                                                    label={text(
                                                        'step.annenForeldrensSituasjon.periode.checkboxVetIkkeTom',
                                                    )}
                                                    name={
                                                        AnnenForelderenSituasjonFormFields.annenForelderPeriodeVetIkkeTom
                                                    }
                                                    afterOnChange={(newValue) => {
                                                        if (newValue) {
                                                            setFieldValue(
                                                                AnnenForelderenSituasjonFormFields.annenForelderPeriodeTom,
                                                                undefined,
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                AnnenForelderenSituasjonFormFields.annenForelderPeriodeMer6Maneder,
                                                                YesOrNo.UNANSWERED,
                                                            );
                                                        }
                                                    }}
                                                />
                                            )}

                                        {annenForelderPeriodeFom &&
                                            annenForelderPeriodeTom &&
                                            isPeriodeLess6month(annenForelderPeriodeFom, annenForelderPeriodeTom) && (
                                                <FormBlock>
                                                    <Alert variant="info">
                                                        {text('step.annenForeldrensSituasjon.advarsel.1')}
                                                    </Alert>
                                                </FormBlock>
                                            )}
                                    </FormBlock>
                                )}

                                {annenForelderPeriodeVetIkkeTom && (
                                    <FormBlock>
                                        <YesOrNoQuestion
                                            name={AnnenForelderenSituasjonFormFields.annenForelderPeriodeMer6Maneder}
                                            legend={text('step.annenForeldrensSituasjon.erVarighetMerEnn6Maneder.spm')}
                                            validate={getYesOrNoValidator()}
                                        />
                                        {annenForelderPeriodeMer6Maneder === YesOrNo.NO && (
                                            <FormBlock>
                                                <Alert variant="info">
                                                    {text('step.annenForeldrensSituasjon.advarsel.1')}
                                                </Alert>
                                            </FormBlock>
                                        )}
                                    </FormBlock>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default AnnenForelderenSituasjonStep;
