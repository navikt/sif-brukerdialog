import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { Alert } from '@navikt/ds-react';
import { getYesOrNoValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { validateFraDato, validateTextArea, validateTildato } from '../../../validation/fieldValidations';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../../søknad/context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { AnnenForeldrenSituasjon, AnnenForeldrenSituasjonType } from '../../../types/AnnenForeldrenSituasjon';
import {
    getAnnenForelderenSituasjonSøknadsdataFromFormValues,
    getAnnenForelderenSituasjonStepInitialValues,
    isPeriodeLess6month,
} from './annenForelderenSituasjonStepUtils';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';

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
    const intl = useIntl();
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
                                <SifGuidePanel>
                                    {intlHelper(intl, 'step.annenForeldrensSituasjon.banner.1')}
                                </SifGuidePanel>

                                <Block margin="xxl">
                                    <RadioGroup
                                        legend={intlHelper(intl, 'step.annenForeldrensSituasjon.grunn.spm')}
                                        name={AnnenForelderenSituasjonFormFields.annenForelderSituasjon}
                                        radios={Object.keys(AnnenForeldrenSituasjon).map(
                                            (grunn: AnnenForeldrenSituasjonType) => {
                                                return {
                                                    label: intlHelper(
                                                        intl,
                                                        `step.annenForeldrensSituasjon.grunn.${grunn}`,
                                                    ),
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
                                    <FormBlock>
                                        <Textarea
                                            name={AnnenForelderenSituasjonFormFields.annenForelderSituasjonBeskrivelse}
                                            label={intlHelper(
                                                intl,
                                                'step.annenForeldrensSituasjon.beskrivelseAvSituasjonen.spm',
                                            )}
                                            minLength={5}
                                            maxLength={1000}
                                            validate={validateTextArea}
                                        />
                                    </FormBlock>
                                )}

                                {annenForelderSituasjon && (
                                    <FormBlock>
                                        <DateRangePicker
                                            legend={intlHelper(
                                                intl,
                                                `step.annenForeldrensSituasjon.periode.${annenForelderSituasjon}.spm`,
                                            )}
                                            fromInputProps={{
                                                label: intlHelper(intl, 'step.annenForeldrensSituasjon.periode.fra'),
                                                name: AnnenForelderenSituasjonFormFields.annenForelderPeriodeFom,
                                                validate: (value) =>
                                                    validateFraDato(value, periodeTil, annenForelderSituasjon),
                                            }}
                                            toInputProps={{
                                                label: intlHelper(intl, 'step.annenForeldrensSituasjon.periode.til'),
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
                                                    label={intlHelper(
                                                        intl,
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
                                                        {intlHelper(intl, 'step.annenForeldrensSituasjon.advarsel.1')}
                                                    </Alert>
                                                </FormBlock>
                                            )}
                                    </FormBlock>
                                )}

                                {annenForelderPeriodeVetIkkeTom && (
                                    <FormBlock>
                                        <YesOrNoQuestion
                                            name={AnnenForelderenSituasjonFormFields.annenForelderPeriodeMer6Maneder}
                                            legend={intlHelper(
                                                intl,
                                                'step.annenForeldrensSituasjon.erVarighetMerEnn6Maneder.spm',
                                            )}
                                            validate={getYesOrNoValidator()}
                                        />
                                        {annenForelderPeriodeMer6Maneder === YesOrNo.NO && (
                                            <FormBlock>
                                                <Alert variant="info">
                                                    {intlHelper(intl, 'step.annenForeldrensSituasjon.advarsel.1')}
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
