import React from 'react';
import { Alert } from '@navikt/ds-react';
import { IntlShape, useIntl } from 'react-intl';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import ItemList from '@navikt/sif-common-core-ds/lib/components/item-list/ItemList';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import BarnListAndDialog from '../../../pre-common/forms/barn/BarnListAndDialog';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { AndreBarn } from '../../../pre-common/forms/barn';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
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
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { prettifyDate } from '@navikt/sif-common-utils/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { getOmBarnaStepInitialValues, getOmBarnaFromFormValues } from './OmBarnaStepUtils';

export enum OmBarnaFormFields {
    andreBarn = 'andreBarn',
}

export interface OmBarnaFormValues {
    [OmBarnaFormFields.andreBarn]: AndreBarn[];
}

const { FormikWrapper, Form } = getTypedFormComponents<OmBarnaFormFields, OmBarnaFormValues, ValidationError>();

const barnItemLabelRenderer = (barnet: RegistrertBarn, intl: IntlShape): React.ReactNode => {
    return (
        <div style={{ display: 'flex' }}>
            <span style={{ order: 1 }}>
                {intlHelper(intl, 'step.deres-felles-barn.født')} {prettifyDate(barnet.fødselsdato)}
            </span>
            <span style={{ order: 2, paddingLeft: '1rem', justifySelf: 'flex-end' }}>
                {formatName(barnet.fornavn, barnet.etternavn, barnet.mellomnavn)}
            </span>
        </div>
    );
};

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
        const OmBarnaSøknadsdata = getOmBarnaFromFormValues(values);
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
        }
    );

    // const kanFortsette = (registrerteBarn !== undefined && registrerteBarn.length > 0) || andreBarn.length > 0;
    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOmBarnaStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { andreBarn } }) => {
                    const andreBarnFnr = andreBarn ? andreBarn.map((barn) => barn.fnr) : [];
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                {registrerteBarn.length > 0 && (
                                    <Block margin="xl">
                                        <ContentWithHeader
                                            header={intlHelper(
                                                intl,
                                                'step.deres-felles-barn.listHeader.registrerteBarn'
                                            )}>
                                            <ItemList<RegistrertBarn>
                                                getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                                                getItemTitle={(registrerteBarn): string => registrerteBarn.etternavn}
                                                labelRenderer={(barnet): React.ReactNode =>
                                                    barnItemLabelRenderer(barnet, intl)
                                                }
                                                items={registrerteBarn}
                                            />
                                        </ContentWithHeader>
                                    </Block>
                                )}

                                <Block margin="xl">
                                    <ContentWithHeader
                                        header={
                                            andreBarn && andreBarn.length === 0
                                                ? intlHelper(intl, 'step.deres-felles-barn.spm.andreBarn')
                                                : intlHelper(intl, 'step.deres-felles-barn.spm.flereBarn')
                                        }>
                                        {intlHelper(intl, 'step.deres-felles-barn.info.spm.text')}
                                    </ContentWithHeader>
                                </Block>
                                <Block margin="l">
                                    <BarnListAndDialog<OmBarnaFormFields>
                                        name={OmBarnaFormFields.andreBarn}
                                        labels={{
                                            addLabel: intlHelper(intl, 'step.deres-felles-barn.listDialog.knapplabel'),
                                            listTitle: intlHelper(intl, 'step.deres-felles-barn.listDialog.listTitle'),
                                            modalTitle: intlHelper(
                                                intl,
                                                'step.deres-felles-barn.listDialog.modalTitle'
                                            ),
                                        }}
                                        disallowedFødselsnumre={[
                                            ...[søker.fødselsnummer, søknadsdata.omAnnenForelderData?.annenForelderFnr],
                                            ...andreBarnFnr,
                                        ]}
                                    />
                                </Block>
                                {andreBarn && andreBarn.length === 0 && registrerteBarn.length === 0 && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            {intlHelper(intl, 'step.deres-felles-barn.info.ingenbarn.2')}
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
