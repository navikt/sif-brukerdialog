import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { Aktivitet, AktivitetFravær } from '../../../types/AktivitetFravær';
import useIntl from 'react-intl/src/components/useIntl';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { dateToISOString, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import {
    getFraværFraStepInitialValues,
    getFraværFraSøknadsdataFromFormValues,
    getUtbetalingsdatoerFraFravær,
} from './FraværFraUtils';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { FormattedMessage } from 'react-intl';
import getRequiredFieldValidator from '@navikt/sif-common-formik-ds/lib/validation/getRequiredFieldValidator';
import dayjs from 'dayjs';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';

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
    const intl = useIntl();
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
                                        <FormattedMessage id="step.fravaerFra.info" />
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
                                                    legend={
                                                        <FormattedMessage
                                                            id="step.fravaerFra.dag.spm"
                                                            values={{ dato }}
                                                        />
                                                    }
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
