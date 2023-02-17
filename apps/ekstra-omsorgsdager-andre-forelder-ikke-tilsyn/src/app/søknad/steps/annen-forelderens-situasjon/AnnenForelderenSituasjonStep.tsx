import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import dayjs from 'dayjs';
import { Alert } from '@navikt/ds-react';

import {
    getYesOrNoValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { validateFradato, validateTildato } from '../../../validation/fieldValidations';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from 'app/søknad/søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from 'app/søknad/context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { AnnenForeldrenSituasjon } from '../../../types/AnnenForeldrenSituasjon';
import {
    getAnnenForelderenSituasjonSøknadsdataFromFormValues,
    getAnnenForelderenSituasjonStepInitialValues,
} from './annenForelderenSituasjonStepUtils';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

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

export const isPeriodeLess6month = (periodeFom: string, periodeTom: string): boolean => {
    return dayjs(periodeTom).add(1, 'day').diff(periodeFom, 'month', true) < 6;
};

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
        }
    );

    const renderTekstArea = () => {
        return (
            <FormBlock>
                <Textarea
                    name={AnnenForelderenSituasjonFormFields.annenForelderSituasjonBeskrivelse}
                    label={intlHelper(intl, 'step.annen-foreldrens-situasjon.beskrivelseAvSituasjonen.spm')}
                    minLength={5}
                    maxLength={1000}
                    validate={(value) => {
                        const error = getStringValidator({ required: true, minLength: 5, maxLength: 1000 })(value);
                        return error
                            ? {
                                  key: error,
                                  values: {
                                      min: 5,
                                      maks: 1000,
                                  },
                              }
                            : undefined;
                    }}
                />
            </FormBlock>
        );
    };

    const renderOver6MndSpm = (values: Partial<AnnenForelderenSituasjonFormValues>) => {
        return (
            <>
                <FormBlock>
                    <YesOrNoQuestion
                        name={AnnenForelderenSituasjonFormFields.annenForelderPeriodeMer6Maneder}
                        legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.erVarighetMerEnn6Maneder.spm')}
                        validate={getYesOrNoValidator()}
                    />
                    {values.annenForelderPeriodeMer6Maneder === YesOrNo.NO && (
                        <FormBlock>
                            <Alert variant="info">
                                {intlHelper(intl, 'step.annen-foreldrens-situasjon.advarsel.1')}
                            </Alert>
                        </FormBlock>
                    )}
                </FormBlock>
            </>
        );
    };

    const renderDateRangePicker = (
        values: Partial<AnnenForelderenSituasjonFormValues>,
        periodeFra?: Date,
        periodeTil?: Date
    ) => {
        const dontShowVetIkkeTomCheckbox = () => {
            return (
                values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel ||
                values.annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt
            );
        };
        if (dontShowVetIkkeTomCheckbox()) {
            values.annenForelderPeriodeVetIkkeTom = undefined;
        }

        if (values.annenForelderPeriodeVetIkkeTom) {
            values.annenForelderPeriodeTom = '';
        }
        return (
            <FormBlock>
                <DateRangePicker
                    legend={
                        values.annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.sykdom.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.innlagtIHelseinstitusjon.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.fengsel.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.verneplikt.spm')
                            : intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.annet.spm')
                    }
                    fromInputProps={{
                        label: intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.fra'),
                        validate: (value) => validateFradato(value, periodeTil, values.annenForelderSituasjon),
                        name: AnnenForelderenSituasjonFormFields.annenForelderPeriodeFom,
                    }}
                    toInputProps={{
                        label: intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.til'),
                        validate: values.annenForelderPeriodeVetIkkeTom
                            ? undefined
                            : (value) => validateTildato(value, periodeFra, values.annenForelderSituasjon),
                        name: AnnenForelderenSituasjonFormFields.annenForelderPeriodeTom,
                        disabled: values.annenForelderPeriodeVetIkkeTom,
                    }}
                />
                {!dontShowVetIkkeTomCheckbox() && (
                    <Checkbox
                        label={intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.checkboxVetIkkeTom')}
                        name={AnnenForelderenSituasjonFormFields.annenForelderPeriodeVetIkkeTom}
                    />
                )}
                {values.annenForelderPeriodeFom &&
                    values.annenForelderPeriodeTom &&
                    isPeriodeLess6month(values.annenForelderPeriodeFom, values.annenForelderPeriodeTom) && (
                        <FormBlock>
                            <Alert variant="info">
                                {intlHelper(intl, 'step.annen-foreldrens-situasjon.advarsel.1')}
                            </Alert>
                        </FormBlock>
                    )}
            </FormBlock>
        );
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getAnnenForelderenSituasjonStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    const periodeFra = datepickerUtils.getDateFromDateString(values.annenForelderPeriodeFom);
                    const periodeTil = datepickerUtils.getDateFromDateString(values.annenForelderPeriodeTom);
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
                                    {intlHelper(intl, 'step.annen-foreldrens-situasjon.banner.1')}
                                </SifGuidePanel>

                                <Block margin="xxl">
                                    <RadioGroup
                                        legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.spm')}
                                        name={AnnenForelderenSituasjonFormFields.annenForelderSituasjon}
                                        radios={[
                                            {
                                                label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.sykdom'),
                                                value: AnnenForeldrenSituasjon.sykdom,
                                            },
                                            {
                                                label: intlHelper(
                                                    intl,
                                                    'step.annen-foreldrens-situasjon.grunn.innlagtIHelseinstitusjon'
                                                ),
                                                value: AnnenForeldrenSituasjon.innlagtIHelseinstitusjon,
                                            },
                                            {
                                                label: intlHelper(
                                                    intl,
                                                    'step.annen-foreldrens-situasjon.grunn.fengsel'
                                                ),
                                                value: AnnenForeldrenSituasjon.fengsel,
                                            },
                                            {
                                                label: intlHelper(
                                                    intl,
                                                    'step.annen-foreldrens-situasjon.grunn.verneplikt'
                                                ),
                                                value: AnnenForeldrenSituasjon.utøverVerneplikt,
                                            },
                                            {
                                                label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.annet'),
                                                value: AnnenForeldrenSituasjon.annet,
                                            },
                                        ]}
                                        validate={getRequiredFieldValidator()}
                                    />
                                </Block>

                                {(values.annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
                                    values.annenForelderSituasjon === AnnenForeldrenSituasjon.annet) &&
                                    renderTekstArea()}

                                {values.annenForelderSituasjon && renderDateRangePicker(values, periodeFra, periodeTil)}

                                {values.annenForelderPeriodeVetIkkeTom && renderOver6MndSpm(values)}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default AnnenForelderenSituasjonStep;
