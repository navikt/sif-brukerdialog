import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import {
    getLovbestemtFerieStepInitialValues,
    getLovbestemtFerieSøknadsdataFromFormValues,
} from './lovbestemtFerieStepUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';
import { DateRange } from '@navikt/sif-common-utils/lib';

export enum LovbestemtFerieFormFields {
    perioder = 'perioder',
}
export interface LovbestemtFerieFormValues {
    [LovbestemtFerieFormFields.perioder]: DateRange[];
}

const { FormikWrapper, Form } = getTypedFormComponents<LovbestemtFerieFormFields, LovbestemtFerieFormValues>();

const LovbestemtFerieStep = () => {
    const stepId = StepId.LOVBESTEMT_FERIE;
    const intl = useIntl();

    const {
        state: { søknadsdata, sak, hvaSkalEndres },
    } = useSøknadContext();
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();
    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: LovbestemtFerieFormValues) => {
        const perioder = getLovbestemtFerieSøknadsdataFromFormValues(values);
        if (perioder) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLovbestemtFerie(perioder)];
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

    return (
        <SøknadStep stepId={stepId} sak={sak} hvaSkalEndres={hvaSkalEndres}>
            <FormikWrapper
                initialValues={getLovbestemtFerieStepInitialValues(søknadsdata, stepFormValues.lovbestemtFerie)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'lovbestemtFerieForm')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            Ferier
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default LovbestemtFerieStep;
