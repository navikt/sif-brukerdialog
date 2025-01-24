import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import {
    getMedlemskapFormInitialValues,
    getMedlemskapSøknadsdataFromFormValues,
    MedlemskapForm,
    UtenlandsoppholdEnkel,
} from '@navikt/sif-common-forms-ds';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';

// import { getMedlemskapStepInitialValues, getMedlemskapSøknadsdataFromFormValues } from './medlemskapStepUtils';

export enum MedlemskapFormFields {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: UtenlandsoppholdEnkel[];
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: UtenlandsoppholdEnkel[];
}

const { FormikWrapper } = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues, ValidationError>();

const MedlemskapStep = () => {
    const {
        intl: { locale },
    } = useAppIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const stepId = StepId.MEDLEMSKAP;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: MedlemskapFormValues) => {
        const MedlemskapSøknadsdata = getMedlemskapSøknadsdataFromFormValues(values);
        if (MedlemskapSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadMedlemskap(MedlemskapSøknadsdata)];
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
                initialValues={getMedlemskapFormInitialValues(søknadsdata.medlemskap, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <MedlemskapForm
                                values={values}
                                isSubmitting={isSubmitting}
                                medlemskapInfoUrl={getLenker(locale).medlemskap}
                                goBack={goBack}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default MedlemskapStep;
