import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { dateToISOString, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getRequiredFieldValidator from '@navikt/sif-common-formik-ds/src/validation/getRequiredFieldValidator';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import dayjs from 'dayjs';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { Aktivitet, AktivitetFravær } from '../../../types/AktivitetFravær';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    getFraværFraStepInitialValues,
    getFraværFraSøknadsdataFromFormValues,
    getUtbetalingsdatoerFraFravær,
} from './FraværFraUtils';

export enum AktivitetFraværField {
    aktivitet = 'aktivitet',
}

export enum FraværFraFormFields {
    aktivitetFravær = 'aktivitetFravær',
}

export interface FraværFraFormValues {
    [FraværFraFormFields.aktivitetFravær]: AktivitetFravær;
}

const { FormikWrapper, Form, RadioGroup } = getTypedFormComponents<
    FraværFraFormFields,
    FraværFraFormValues,
    ValidationError
>();

const FraværFraStep = () => {
    const { intl } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.FRAVÆR_FRA;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: FraværFraFormValues) => {
        const fraværFraSøknadsdata = getFraværFraSøknadsdataFromFormValues(values);
        if (fraværFraSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadFraværFra(fraværFraSøknadsdata)];
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

    const getFieldName = (dato: Date, field: AktivitetFraværField): string => {
        const key = dateToISOString(dato);
        return `${FraværFraFormFields.aktivitetFravær}.${key}.${field}`;
    };

    const { fravaer } = søknadsdata;

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getFraværFraStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={() => {
                    if (!fravaer) {
                        //TODO check this
                        return undefined;
                    }
                    const fraværPerioder =
                        fravaer.type === 'harFulltOgDelvisFravær' || fravaer.type === 'harKunFulltFravær'
                            ? fravaer.fraværPerioder
                            : [];

                    const fraværDager =
                        fravaer.type === 'harFulltOgDelvisFravær' || fravaer.type === 'harKunDelvisFravær'
                            ? fravaer.fraværDager
                            : [];

                    const utbetalingsdatoer = getUtbetalingsdatoerFraFravær(fraværPerioder, fraværDager);

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormBlock>
                                    <SifGuidePanel>
                                        <p>
                                            <AppText id="step.fravaerFra.info" />
                                        </p>
                                    </SifGuidePanel>
                                </FormBlock>

                                <FormBlock>
                                    {utbetalingsdatoer.map((date) => {
                                        const fieldName = getFieldName(date, AktivitetFraværField.aktivitet);
                                        const dato = dayjs(date).format('dddd D. MMM YYYY');

                                        return (
                                            <FormBlock key={fieldName}>
                                                <RadioGroup
                                                    name={fieldName as FraværFraFormFields}
                                                    legend={<AppText id="step.fravaerFra.dag.spm" values={{ dato }} />}
                                                    radios={[
                                                        {
                                                            label: 'Frilanser',
                                                            value: Aktivitet.FRILANSER,
                                                        },
                                                        {
                                                            label: 'Selvstendig næringsdrivende',
                                                            value: Aktivitet.SELVSTENDIG_VIRKSOMHET,
                                                        },
                                                        {
                                                            label: 'Både frilanser og selvstendig næringsdrivende',
                                                            value: Aktivitet.BEGGE,
                                                        },
                                                    ]}
                                                    validate={(value) => {
                                                        const error = getRequiredFieldValidator()(value);
                                                        return error
                                                            ? {
                                                                  key: 'validation.aktivitetFravær.noValue',
                                                                  values: { dato },
                                                                  keepKeyUnaltered: true,
                                                              }
                                                            : undefined;
                                                    }}
                                                />
                                            </FormBlock>
                                        );
                                    })}
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default FraværFraStep;
