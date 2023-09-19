import { FormattedMessage, useIntl } from 'react-intl';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import {
    barnItemLabelRenderer,
    getDineBarnStepInitialValues,
    getDineBarnSøknadsdataFromFormValues,
    nYearsAgo,
} from './dineBarnStepUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { SøknadContextState } from '../../../types/SøknadContextState';
import SøknadStep from '../../SøknadStep';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/AnnetBarnListAndDialog';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { Alert, Heading } from '@navikt/ds-react';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import ItemList from '@navikt/sif-common-core-ds/lib/components/lists/item-list/ItemList';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import { dateToday } from '@navikt/sif-common-utils/lib/dateUtils';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';

export enum DineBarnFormFields {
    andreBarn = 'andreBarn',
}

export interface DineBarnFormValues {
    [DineBarnFormFields.andreBarn]?: AnnetBarn[];
}

const { FormikWrapper, Form } = getTypedFormComponents<DineBarnFormFields, DineBarnFormValues, ValidationError>();

const DineBarnStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata, søker, registrerteBarn },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DINE_BARN;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DineBarnFormValues) => {
        const DineBarnSøknadsdata = getDineBarnSøknadsdataFromFormValues(values);
        if (DineBarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadDineBarn(DineBarnSøknadsdata),
                actionsCreator.setSøknadTempFormValues(undefined),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state, tempFormValues: undefined });
        },
    );

    const { persistTempFormValues } = usePersistTempFormValues();

    const setAndreBarnChanged = (values: Partial<DineBarnFormValues>) => {
        dispatch(actionsCreator.setSøknadTempFormValues({ stepId, values }));
        persistTempFormValues({ stepId, values });
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDineBarnStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { andreBarn = [] } }) => {
                    const andreBarnFnr = andreBarn.map((barn) => barn.fnr);
                    const kanFortsette = registrerteBarn.length > 0 || andreBarn.length > 0;

                    const oppdatereAndreBarn = (values: AnnetBarn[]) => {
                        setAndreBarnChanged({
                            andreBarn: values,
                        });
                    };

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
                                <SifGuidePanel>
                                    <FormattedMessage id="step.dineBarn.counsellorPanel.avsnitt.1" />
                                    <Block margin="l">
                                        <FormattedMessage id="step.dineBarn.counsellorPanel.avsnitt.2" />
                                    </Block>
                                </SifGuidePanel>

                                <FormBlock>
                                    <Heading level="2" size="medium">
                                        <FormattedMessage id="step.dineBarn.seksjonsTittel" />
                                    </Heading>

                                    {registrerteBarn.length > 0 && (
                                        <Block>
                                            <ItemList<RegistrertBarn>
                                                getItemId={(registrerteBarn): string => registrerteBarn.aktørId}
                                                getItemTitle={(registrerteBarn): string => registrerteBarn.etternavn}
                                                labelRenderer={(registrerteBarn): React.ReactNode =>
                                                    barnItemLabelRenderer(registrerteBarn)
                                                }
                                                items={registrerteBarn}
                                            />
                                        </Block>
                                    )}

                                    <FormBlock>
                                        <ContentWithHeader
                                            header={
                                                andreBarn.length === 0
                                                    ? intlHelper(intl, 'step.dineBarn.info.spm.andreBarn')
                                                    : intlHelper(intl, 'step.dineBarn.info.spm.flereBarn')
                                            }>
                                            {intlHelper(intl, 'step.dineBarn.info.spm.text')}
                                        </ContentWithHeader>
                                    </FormBlock>
                                    <Block margin="l">
                                        <AnnetBarnListAndDialog<DineBarnFormFields>
                                            name={DineBarnFormFields.andreBarn}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'step.dineBarn.annetBarnListAndDialog.addLabel',
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'step.dineBarn.annetBarnListAndDialog.listTitle',
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'step.dineBarn.annetBarnListAndDialog.modalTitle',
                                                ),
                                            }}
                                            maxDate={dateToday}
                                            minDate={nYearsAgo(18)}
                                            disallowedFødselsnumre={[...[søker.fødselsnummer], ...andreBarnFnr]}
                                            aldersGrenseText={intlHelper(
                                                intl,
                                                'step.dineBarn.formLeggTilBarn.aldersGrenseInfo',
                                            )}
                                            visBarnTypeValg={true}
                                            onAfterChange={(values) => oppdatereAndreBarn(values)}
                                        />
                                    </Block>
                                </FormBlock>

                                {!kanFortsette && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            <FormattedMessage id="step.dineBarn.info.ingenbarn.2" />
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

export default DineBarnStep;
