import { FormattedMessage, useIntl } from 'react-intl';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib/types';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import {
    barnItemLabelRenderer,
    getBarnOptions,
    getDineBarnStepInitialValues,
    getDineBarnSøknadsdataFromFormValues,
    minstEtBarn12årIårellerYngre,
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
import {
    getYesOrNoValidator,
    getListValidator,
    getCheckedValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import { dateToday } from '@navikt/sif-common-utils/lib/dateUtils';

export enum DineBarnFormFields {
    andreBarn = 'andreBarn',
    harUtvidetRett = 'harUtvidetRett',
    harUtvidetRettFor = 'harUtvidetRettFor',
    harDekketTiFørsteDagerSelv = 'harDekketTiFørsteDagerSelv',
}

export interface DineBarnFormValues {
    [DineBarnFormFields.andreBarn]?: AnnetBarn[];
    [DineBarnFormFields.harDekketTiFørsteDagerSelv]?: boolean;
    [DineBarnFormFields.harUtvidetRett]: YesOrNo;
    [DineBarnFormFields.harUtvidetRettFor]: string[];
}

const { FormikWrapper, Form, YesOrNoQuestion, CheckboxGroup, ConfirmationCheckbox } = getTypedFormComponents<
    DineBarnFormFields,
    DineBarnFormValues,
    ValidationError
>();

const DineBarnStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata, søker, registrerteBarn },
    } = useSøknadContext();

    const stepId = StepId.DINE_BARN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DineBarnFormValues) => {
        const DineBarnSøknadsdata = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
        if (DineBarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadDineBarn(DineBarnSøknadsdata)];
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
    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDineBarnStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { andreBarn = [], harUtvidetRett, harUtvidetRettFor } }) => {
                    const barnOptions = getBarnOptions(registrerteBarn, andreBarn);
                    const andreBarnFnr = andreBarn.map((barn) => barn.fnr);
                    const kanIkkeFortsette =
                        minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === false &&
                        harUtvidetRett === YesOrNo.NO;
                    const kanFortsette = (registrerteBarn.length > 0 || andreBarn.length > 0) && !kanIkkeFortsette;
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
                                    <FormattedMessage id="step.dine-barn.counsellorPanel.avsnitt.1" />
                                    <Block margin="l">
                                        <FormattedMessage id="step.dine-barn.counsellorPanel.avsnitt.2" />
                                    </Block>
                                </SifGuidePanel>

                                <FormBlock>
                                    <Heading level="2" size="medium">
                                        <FormattedMessage id="step.dine-barn.seksjonsTittel" />
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
                                                    ? intlHelper(intl, 'step.dine-barn.info.spm.andreBarn')
                                                    : intlHelper(intl, 'step.dine-barn.info.spm.flereBarn')
                                            }>
                                            {intlHelper(intl, 'step.dine-barn.info.spm.text')}
                                        </ContentWithHeader>
                                    </FormBlock>
                                    <Block margin="l">
                                        <AnnetBarnListAndDialog<DineBarnFormFields>
                                            name={DineBarnFormFields.andreBarn}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'step.dine-barn.annetBarnListAndDialog.addLabel'
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'step.dine-barn.annetBarnListAndDialog.listTitle'
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'step.dine-barn.annetBarnListAndDialog.modalTitle'
                                                ),
                                            }}
                                            maxDate={dateToday}
                                            minDate={nYearsAgo(18)}
                                            disallowedFødselsnumre={[...[søker.fødselsnummer], ...andreBarnFnr]}
                                            aldersGrenseText={intlHelper(
                                                intl,
                                                'step.dine-barn.formLeggTilBarn.aldersGrenseInfo'
                                            )}
                                            visBarnTypeValg={true}
                                            // onAfterChange={() => setAndreBarnChanged(true)}
                                        />
                                    </Block>
                                </FormBlock>
                                {minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === false && (
                                    <>
                                        <Heading level="2" size="medium">
                                            <FormattedMessage id="step.dine-barn.harFåttEkstraOmsorgsdager.label" />
                                        </Heading>

                                        <YesOrNoQuestion
                                            name={DineBarnFormFields.harUtvidetRett}
                                            legend={
                                                registrerteBarn.length + andreBarn.length === 1
                                                    ? intlHelper(
                                                          intl,
                                                          'step.dine-barn.harFåttEkstraOmsorgsdager.spm.ettBarn'
                                                      )
                                                    : intlHelper(intl, 'step.dine-barn.harFåttEkstraOmsorgsdager.spm')
                                            }
                                            validate={getYesOrNoValidator()}
                                        />

                                        <FormBlock>
                                            {harUtvidetRett === YesOrNo.YES && (
                                                <>
                                                    {registrerteBarn.length + andreBarn.length > 1 && (
                                                        <>
                                                            <CheckboxGroup
                                                                legend={intlHelper(
                                                                    intl,
                                                                    'step.dine-barn.utvidetRettFor.spm'
                                                                )}
                                                                name={DineBarnFormFields.harUtvidetRettFor}
                                                                checkboxes={barnOptions}
                                                                validate={getListValidator({ required: true })}
                                                            />
                                                            {harUtvidetRettFor && harUtvidetRettFor.length > 0 && (
                                                                <Block margin="l">
                                                                    <Alert variant="info">
                                                                        <FormattedMessage id="step.dine-barn.utvidetRettFor.info" />
                                                                    </Alert>
                                                                </Block>
                                                            )}
                                                        </>
                                                    )}
                                                    {registrerteBarn.length + andreBarn.length === 1 && (
                                                        <Block margin="l">
                                                            <Alert variant="info">
                                                                <FormattedMessage id="step.dine-barn.utvidetRettFor.info.ettBarn" />
                                                            </Alert>
                                                        </Block>
                                                    )}
                                                </>
                                            )}

                                            {harUtvidetRett === YesOrNo.NO && (
                                                <Alert variant="info">
                                                    <FormattedMessage id="step.dine-barn.harFåttEkstraOmsorgsdager.nei.alertStripe" />
                                                </Alert>
                                            )}
                                        </FormBlock>
                                    </>
                                )}
                                {minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) && (
                                    <Block
                                        title={intlHelper(intl, 'step.dine-barn.bekrefterDektTiDagerSelv.info.titel')}>
                                        <FormattedMessage id="step.dine-barn.bekrefterDektTiDagerSelv.info" />
                                        <FormBlock>
                                            <ContentWithHeader
                                                header={intlHelper(
                                                    intl,
                                                    'step.dine-barn.bekrefterDektTiDagerSelv.label'
                                                )}>
                                                <ConfirmationCheckbox
                                                    label={intlHelper(intl, 'step.dine-barn.bekrefterDektTiDagerSelv')}
                                                    name={DineBarnFormFields.harDekketTiFørsteDagerSelv}
                                                    validate={getCheckedValidator()}
                                                />
                                            </ContentWithHeader>
                                        </FormBlock>
                                    </Block>
                                )}

                                {andreBarn.length === 0 && registrerteBarn.length === 0 && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            <FormattedMessage id="step.dine-barn.info.ingenbarn.2" />
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
