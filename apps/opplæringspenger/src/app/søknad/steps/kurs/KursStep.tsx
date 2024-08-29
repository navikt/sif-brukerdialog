import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { getKursStepInitialValues, getKursSøknadsdataFromFormValues } from './kursStepUtils';
import { Kursholder } from '../../../types/Kursholder';
import { Kursperiode } from '../../../types/Kursperiode';
import KursperiodeListAndDialog from './kursperiode/KursperiodeListAndDialog';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';

export enum KursFormFields {
    kursholder = 'kursholder',
    kursperioder = 'kursperioder',
}

export interface KursFormValues {
    [KursFormFields.kursholder]?: Kursholder;
    [KursFormFields.kursperioder]?: Kursperiode[];
}

const { FormikWrapper, Form } = getTypedFormComponents<KursFormFields, KursFormValues, ValidationError>();

const KursStep = () => {
    const { intl } = useAppIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values);
        if (kursSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadKurs(kursSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getKursStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={() => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <p>
                                        <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <KursperiodeListAndDialog
                                        name={KursFormFields.kursperioder}
                                        labels={{
                                            addLabel: 'Legg til kursperiode',
                                            modalTitle: 'Legg til kursperiode',
                                            listTitle: 'Kursperioder',
                                        }}
                                        validate={getListValidator({ minItems: 1, required: true })}
                                    />
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
