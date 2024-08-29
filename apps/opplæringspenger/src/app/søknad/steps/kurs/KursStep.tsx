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
import KursperiodeListAndDialog from './kursperiode/KursperiodeListAndDialog';
import { getListValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { Heading, VStack } from '@navikt/ds-react';
import { Kursperiode } from '../../../types/Kursperiode';
import { FormPanel } from '@navikt/sif-common-ui';

export enum KursFormFields {
    kursholder = 'kursholder',
    kursholder_annen_navn = 'kursholder_annen_navn',
    kursholder_annen_beskrivelse = 'kursholder_annen_beskrivelse',
    kursperioder = 'kursperioder',
}

export interface KursFormValues {
    [KursFormFields.kursholder]?: Kursholder | 'annen';
    [KursFormFields.kursholder_annen_navn]?: string;
    [KursFormFields.kursholder_annen_beskrivelse]?: string;
    [KursFormFields.kursperioder]?: Kursperiode[];
}

const { FormikWrapper, Form, Select, TextField, Textarea } = getTypedFormComponents<
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
                                            name={KursFormFields.kursholder}
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
                                                <option value={'annen'}>Legg til annen helseinstitusjon</option>
                                            </optgroup>
                                        </Select>

                                        {values[KursFormFields.kursholder] === 'annen' && (
                                            <FormPanel>
                                                <VStack gap="6">
                                                    <Heading as="h2" size="small">
                                                        Annen helseinstitusjon/kompetansesenter
                                                    </Heading>
                                                    <TextField
                                                        name={KursFormFields.kursholder_annen_navn}
                                                        label="Navn på helseinstitusjon"></TextField>
                                                    <Textarea
                                                        name={KursFormFields.kursholder_annen_beskrivelse}
                                                        label="Beskrivelse og kontaktinformasjon (telefon)"></Textarea>
                                                </VStack>
                                            </FormPanel>
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
