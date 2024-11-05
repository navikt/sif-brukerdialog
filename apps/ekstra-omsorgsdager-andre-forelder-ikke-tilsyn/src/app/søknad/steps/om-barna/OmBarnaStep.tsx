import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import BarnListAndDialog from '../../../pre-common/forms/barn/BarnListAndDialog';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { AndreBarn } from '../../../pre-common/forms/barn';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import actionsCreator from '../../context/action/actionCreator';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import {
    barnItemLabelRenderer,
    getOmBarnaStepInitialValues,
    getOmBarnaSøknadsdataFromFormValues,
} from './OmBarnaStepUtils';
import { AppText, useAppIntl } from '../../../i18n';

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
                                {registrerteBarn.length > 0 && (
                                    <Block margin="xl">
                                        <Heading level="3" size="xsmall" spacing={true}>
                                            {text('step.omBarna.listHeader.registrerteBarn')}
                                        </Heading>
                                        <BodyLong spacing={true}>
                                            <AppText id="step.omBarna.registrerteBarn.kilde" />
                                        </BodyLong>
                                        <ItemList<RegistrertBarn>
                                            getItemId={(b): string => b.aktørId}
                                            getItemTitle={(b): string => b.etternavn}
                                            labelRenderer={(barnet) => barnItemLabelRenderer(barnet, appIntl)}
                                            items={registrerteBarn}
                                        />
                                    </Block>
                                )}

                                <Block margin="xl">
                                    <Heading level="3" size="xsmall" spacing={true}>
                                        {andreBarn && andreBarn.length === 0
                                            ? text('step.omBarna.spm.andreBarn')
                                            : text('step.omBarna.spm.flereBarn')}
                                    </Heading>
                                    {text('step.omBarna.info.spm.text')}
                                </Block>
                                <Block margin="l">
                                    <BarnListAndDialog<OmBarnaFormFields>
                                        name={OmBarnaFormFields.andreBarn}
                                        labels={{
                                            addLabel: text('step.omBarna.listDialog.knapplabel'),
                                            listTitle: text('step.omBarna.listDialog.listTitle'),
                                            modalTitle: text('step.omBarna.listDialog.modalTitle'),
                                        }}
                                        disallowedFødselsnumre={[
                                            ...[søker.fødselsnummer],
                                            ...annenForelderFnr,
                                            ...andreBarnFnr,
                                        ]}
                                    />
                                </Block>
                                {andreBarn && andreBarn.length === 0 && registrerteBarn.length === 0 && (
                                    <Block margin="l">
                                        <Alert variant="warning">{text('step.omBarna.info.ingenbarn.2')}</Alert>
                                    </Block>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmBarnaStep;
