import { Alert, VStack } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import {
    getListValidator,
    getRequiredFieldValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { Kursperiode } from '../../../types/Kursperiode';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import KursperiodeListAndDialog from './kursperiode/KursperiodeListAndDialog';
import { getKursStepInitialValues, getKursSøknadsdataFromFormValues } from './kursStepUtils';

export enum KursFormFields {
    kursholderId = 'kursholderId',
    kursperioder = 'kursperioder',
    arbeiderIKursperiode = 'arbeiderIKursperiode',
}

export interface KursFormValues {
    [KursFormFields.kursholderId]?: string;
    [KursFormFields.kursperioder]?: Kursperiode[];
    [KursFormFields.arbeiderIKursperiode]?: YesOrNo;
}

const { FormikWrapper, Form, Select, YesOrNoQuestion } = getTypedFormComponents<
    KursFormFields,
    KursFormValues,
    ValidationError
>();

const KursStep = () => {
    const { intl } = useAppIntl();

    const {
        state: { søknadsdata, kursholdere },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values, kursholdere);
        if (kursSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadKurs(kursSøknadsdata),
                actionsCreator.syncArbeidstidMedKursperioder(kursSøknadsdata),
            ];
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
                renderForm={({ values }) => {
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
                                <VStack gap={'8'}>
                                    <SifGuidePanel>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />
                                        </p>
                                    </SifGuidePanel>

                                    <VStack gap={'4'}>
                                        <Select
                                            label="Velg helseinstitusjon/kompetansesenter"
                                            name={KursFormFields.kursholderId}
                                            validate={getRequiredFieldValidator()}>
                                            <option value="">Velg</option>
                                            <optgroup label="Godkjente helseinstitusjoner">
                                                {kursholdere.map((kursholder) => (
                                                    <option value={kursholder.id} key={kursholder.id}>
                                                        {kursholder.navn}
                                                    </option>
                                                ))}
                                            </optgroup>
                                            <optgroup label="Annen helseinstitusjon">
                                                <option value={'annen'}>Annen helseinstitusjon</option>
                                            </optgroup>
                                        </Select>

                                        {values[KursFormFields.kursholderId] === 'annen' && (
                                            <Alert variant="info">
                                                Hvis du ikke finner institusjonen i listen over, må ...
                                            </Alert>
                                        )}
                                    </VStack>

                                    <KursperiodeListAndDialog
                                        name={KursFormFields.kursperioder}
                                        labels={{
                                            addLabel: 'Legg til kursperiode',
                                            modalTitle: 'Legg til kursperiode',
                                            listTitle: 'Kursperioder',
                                        }}
                                        validate={getListValidator({ minItems: 1, required: true })}
                                    />
                                    <YesOrNoQuestion
                                        name={KursFormFields.arbeiderIKursperiode}
                                        legend="Jobber du noe på de dagene du er på er på kurs, eller reiser til og fra kurs?"
                                        validate={getYesOrNoValidator()}
                                    />
                                </VStack>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
