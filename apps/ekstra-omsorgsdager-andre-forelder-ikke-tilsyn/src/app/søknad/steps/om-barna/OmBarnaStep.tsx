import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { FormLayout, RegistrerteBarnListe } from '@navikt/sif-common-ui';
import { AndreBarn } from '../../../pre-common/forms/barn';
import BarnListAndDialog from '../../../pre-common/forms/barn/BarnListAndDialog';
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
import { getOmBarnaStepInitialValues, getOmBarnaSøknadsdataFromFormValues } from './OmBarnaStepUtils';

export enum OmBarnaFormFields {
    andreBarn = 'andreBarn',
}

export interface OmBarnaFormValues {
    [OmBarnaFormFields.andreBarn]: AndreBarn[];
}

const { FormikWrapper, Form } = getTypedFormComponents<OmBarnaFormFields, OmBarnaFormValues, ValidationError>();

const OmBarnaStep = () => {
    const appIntl = useAppIntl();
    const { text, intl } = appIntl;
    const {
        state: { søknadsdata, registrerteBarn, søker },
    } = useSøknadContext();

    const stepId = StepId.OM_BARNA;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmBarnaFormValues) => {
        const OmBarnaSøknadsdata = getOmBarnaSøknadsdataFromFormValues(values);
        if (OmBarnaSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmBarna(OmBarnaSøknadsdata)];
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
                initialValues={getOmBarnaStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { andreBarn } }) => {
                    const andreBarnFnr = andreBarn ? andreBarn.map((barn) => barn.fnr) : [];
                    const annenForelderFnr = søknadsdata.omAnnenForelder
                        ? [søknadsdata.omAnnenForelder.annenForelderFnr]
                        : [];
                    const kanFortsette =
                        (registrerteBarn !== undefined && registrerteBarn.length > 0) ||
                        (andreBarn && andreBarn.length > 0);
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={!kanFortsette || isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Questions>
                                    {registrerteBarn.length > 0 && (
                                        <div>
                                            <RegistrerteBarnListe.Heading level="2" size="small" spacing={true}>
                                                {text('step.omBarna.listHeader.registrerteBarn')}
                                            </RegistrerteBarnListe.Heading>
                                            <RegistrerteBarnListe registrerteBarn={registrerteBarn} />
                                        </div>
                                    )}

                                    <div>
                                        <Heading level="2" size="small" spacing={true}>
                                            {andreBarn && andreBarn.length === 0
                                                ? text('step.omBarna.spm.andreBarn')
                                                : text('step.omBarna.spm.flereBarn')}
                                        </Heading>
                                        <VStack gap="4">
                                            <BodyShort>
                                                <AppText id="step.omBarna.info.spm.text" />
                                            </BodyShort>
                                            <BarnListAndDialog<OmBarnaFormFields>
                                                name={OmBarnaFormFields.andreBarn}
                                                labels={{
                                                    addLabel: text('step.omBarna.listDialog.knapplabel'),
                                                    listTitle: text('step.omBarna.listDialog.listTitle'),
                                                    modalTitle: text('step.omBarna.listDialog.modalTitle'),
                                                    hideListTitle: andreBarn === undefined || andreBarn.length === 0,
                                                }}
                                                disallowedFødselsnumre={[
                                                    ...[søker.fødselsnummer],
                                                    ...annenForelderFnr,
                                                    ...andreBarnFnr,
                                                ]}
                                            />
                                        </VStack>
                                    </div>

                                    {andreBarn && andreBarn.length === 0 && registrerteBarn.length === 0 && (
                                        <Alert variant="warning">{text('step.omBarna.info.ingenbarn.2')}</Alert>
                                    )}
                                </FormLayout.Questions>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmBarnaStep;
