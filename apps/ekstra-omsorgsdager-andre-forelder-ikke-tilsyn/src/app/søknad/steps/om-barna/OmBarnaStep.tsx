import { Alert } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
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

export enum OmBarnaFormFields {
    andreBarn = 'andreBarn',
}

export interface OmBarnaFormValues {
    [OmBarnaFormFields.andreBarn]: AndreBarn[];
}

const { FormikWrapper, Form } = getTypedFormComponents<OmBarnaFormFields, OmBarnaFormValues, ValidationError>();

const OmBarnaStep = () => {
    const intl = useIntl();
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
                                        <ContentWithHeader
                                            header={intlHelper(intl, 'step.omBarna.listHeader.registrerteBarn')}>
                                            <ItemList<RegistrertBarn>
                                                getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                                                getItemTitle={(registrerteBarn): string => registrerteBarn.etternavn}
                                                labelRenderer={(barnet) => barnItemLabelRenderer(barnet, intl)}
                                                items={registrerteBarn}
                                            />
                                        </ContentWithHeader>
                                    </Block>
                                )}

                                <Block margin="xl">
                                    <ContentWithHeader
                                        header={
                                            andreBarn && andreBarn.length === 0
                                                ? intlHelper(intl, 'step.omBarna.spm.andreBarn')
                                                : intlHelper(intl, 'step.omBarna.spm.flereBarn')
                                        }>
                                        {intlHelper(intl, 'step.omBarna.info.spm.text')}
                                    </ContentWithHeader>
                                </Block>
                                <Block margin="l">
                                    <BarnListAndDialog<OmBarnaFormFields>
                                        name={OmBarnaFormFields.andreBarn}
                                        labels={{
                                            addLabel: intlHelper(intl, 'step.omBarna.listDialog.knapplabel'),
                                            listTitle: intlHelper(intl, 'step.omBarna.listDialog.listTitle'),
                                            modalTitle: intlHelper(intl, 'step.omBarna.listDialog.modalTitle'),
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
                                        <Alert variant="warning">
                                            {intlHelper(intl, 'step.omBarna.info.ingenbarn.2')}
                                        </Alert>
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
