import { VStack } from '@navikt/ds-react';
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
import { getTillattSøknadsperiode } from '../../../utils/søknadsperiodeUtils';

export enum KursFormFields {
    opplæringsinstitusjonId = 'opplæringsinstitusjonId',
    kursperioder = 'kursperioder',
    arbeiderIKursperiode = 'arbeiderIKursperiode',
}

export interface KursFormValues {
    [KursFormFields.opplæringsinstitusjonId]?: string;
    [KursFormFields.kursperioder]?: Kursperiode[];
    [KursFormFields.arbeiderIKursperiode]?: YesOrNo;
}

const { FormikWrapper, Form, Select, YesOrNoQuestion } = getTypedFormComponents<
    KursFormFields,
    KursFormValues,
    ValidationError
>();

const KursStep = () => {
    const { intl, text } = useAppIntl();

    const {
        state: { søknadsdata, opplæringsinstitusjoner },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const gyldigSøknadsperiode = getTillattSøknadsperiode();

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values, opplæringsinstitusjoner);
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
                renderForm={() => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'steg.kurs.validation')}
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
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.2" />
                                        </p>
                                    </SifGuidePanel>

                                    <VStack gap={'4'}>
                                        <Select
                                            label={text('steg.kurs.opplæringsinstitusjonId.label')}
                                            name={KursFormFields.opplæringsinstitusjonId}
                                            validate={getRequiredFieldValidator()}>
                                            <option value="">
                                                <AppText id="steg.kurs.opplæringsinstitusjoner.velg" />
                                            </option>
                                            <optgroup label={text('steg.kurs.opplæringsinstitusjoner.godkjente.group')}>
                                                {opplæringsinstitusjoner.map((opplæringsinstitusjon) => (
                                                    <option
                                                        value={opplæringsinstitusjon.uuid}
                                                        key={opplæringsinstitusjon.uuid}>
                                                        {opplæringsinstitusjon.navn}
                                                    </option>
                                                ))}
                                            </optgroup>
                                            <optgroup label={text('steg.kurs.opplæringsinstitusjoner.annen.group')}>
                                                <option value={'annen'}>
                                                    {text('steg.kurs.opplæringsinstitusjoner.annen.option')}
                                                </option>
                                            </optgroup>
                                        </Select>
                                    </VStack>

                                    <KursperiodeListAndDialog
                                        name={KursFormFields.kursperioder}
                                        labels={{
                                            addLabel: text('steg.kurs.kursperiode.addLabel'),
                                            modalTitle: text('steg.kurs.kursperiode.modalTitle'),
                                            listTitle: text('steg.kurs.kursperiode.listTitle'),
                                        }}
                                        minDate={gyldigSøknadsperiode.from}
                                        maxDate={gyldigSøknadsperiode.to}
                                        validate={getListValidator({ minItems: 1, required: true })}
                                    />

                                    <YesOrNoQuestion
                                        name={KursFormFields.arbeiderIKursperiode}
                                        legend={text('steg.kurs.arbeiderIKursperiode.label')}
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
