import { Alert, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import ItemList from '@navikt/sif-common-core-ds/lib/components/lists/item-list/ItemList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib/types';
import {
    getCheckedValidator,
    getListValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/AnnetBarnListAndDialog';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { dateToday } from '@navikt/sif-common-utils/lib/dateUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    barnItemLabelRenderer,
    cleanHarUtvidetRettFor,
    getBarnOptions,
    getDineBarnStepInitialValues,
    getDineBarnSøknadsdataFromFormValues,
    minstEtBarn12årIårellerYngre,
    nYearsAgo,
} from './dineBarnStepUtils';
// import { FormikValuesObserver } from '@navikt/sif-common-formik-ds/lib';

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
        state: { søknadsdata, søker, registrerteBarn, tempFormData },
        dispatch,
    } = useSøknadContext();

    const stepId = StepId.DINE_BARN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DineBarnFormValues) => {
        const DineBarnSøknadsdata = getDineBarnSøknadsdataFromFormValues(values, { registrerteBarn });
        if (DineBarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadDineBarn(DineBarnSøknadsdata),
                actionsCreator.setSøknadTempFormData(undefined),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state, tempFormData: undefined });
        },
    );

    const { persistTempFormValues } = usePersistTempFormValues();

    const setAndreBarnChanged = (values: Partial<DineBarnFormValues>) => {
        dispatch(actionsCreator.setSøknadTempFormData({ stepId, values }));
        persistTempFormValues({ stepId, values });
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDineBarnStepInitialValues(søknadsdata, tempFormData, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: { andreBarn = [], harUtvidetRett, harUtvidetRettFor, harDekketTiFørsteDagerSelv },
                }) => {
                    const barnOptions = getBarnOptions(registrerteBarn, andreBarn);
                    const andreBarnFnr = andreBarn.map((barn) => barn.fnr);
                    const kanIkkeFortsette =
                        minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === false &&
                        harUtvidetRett === YesOrNo.NO;
                    const kanFortsette = (registrerteBarn.length > 0 || andreBarn.length > 0) && !kanIkkeFortsette;
                    const oppdatereAndreBarn = (values: AnnetBarn[]) => {
                        setAndreBarnChanged({
                            andreBarn: values,
                            harUtvidetRett,
                            harUtvidetRettFor: harUtvidetRettFor
                                ? cleanHarUtvidetRettFor(harUtvidetRettFor, values, registrerteBarn)
                                : harUtvidetRettFor,
                            harDekketTiFørsteDagerSelv,
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
                                    <p>
                                        <FormattedMessage id="step.dineBarn.counsellorPanel.avsnitt.1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.dineBarn.counsellorPanel.avsnitt.2" />
                                    </p>
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
                                {minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === false && (
                                    <FormBlock>
                                        <Heading level="2" size="medium">
                                            <FormattedMessage id="step.dineBarn.harFåttEkstraOmsorgsdager.label" />
                                        </Heading>
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                name={DineBarnFormFields.harUtvidetRett}
                                                legend={
                                                    registrerteBarn.length + andreBarn.length === 1
                                                        ? intlHelper(
                                                              intl,
                                                              'step.dineBarn.harFåttEkstraOmsorgsdager.spm.ettBarn',
                                                          )
                                                        : intlHelper(
                                                              intl,
                                                              'step.dineBarn.harFåttEkstraOmsorgsdager.spm',
                                                          )
                                                }
                                                validate={getYesOrNoValidator()}
                                                data-testid="harUtvidetRett"
                                            />
                                        </FormBlock>
                                        <FormBlock>
                                            {harUtvidetRett === YesOrNo.YES && (
                                                <>
                                                    {registrerteBarn.length + andreBarn.length > 1 && (
                                                        <>
                                                            <CheckboxGroup
                                                                legend={intlHelper(
                                                                    intl,
                                                                    'step.dineBarn.utvidetRettFor.spm',
                                                                )}
                                                                name={DineBarnFormFields.harUtvidetRettFor}
                                                                checkboxes={barnOptions}
                                                                validate={(value) =>
                                                                    getListValidator({ required: true })(
                                                                        cleanHarUtvidetRettFor(
                                                                            value,
                                                                            andreBarn,
                                                                            registrerteBarn,
                                                                        ),
                                                                    )
                                                                }
                                                                data-testid="harUtvidetRettFor"
                                                            />
                                                            {harUtvidetRettFor && harUtvidetRettFor.length > 0 && (
                                                                <Block margin="l">
                                                                    <Alert variant="info">
                                                                        <FormattedMessage id="step.dineBarn.utvidetRettFor.info" />
                                                                    </Alert>
                                                                </Block>
                                                            )}
                                                        </>
                                                    )}
                                                    {registrerteBarn.length + andreBarn.length === 1 && (
                                                        <Block margin="l">
                                                            <Alert variant="info">
                                                                <FormattedMessage id="step.dineBarn.utvidetRettFor.info.ettBarn" />
                                                            </Alert>
                                                        </Block>
                                                    )}
                                                </>
                                            )}

                                            {harUtvidetRett === YesOrNo.NO && (
                                                <Alert variant="info">
                                                    <FormattedMessage id="step.dineBarn.harFåttEkstraOmsorgsdager.nei.alertStripe" />
                                                </Alert>
                                            )}
                                        </FormBlock>
                                    </FormBlock>
                                )}
                                {minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) && (
                                    <Block
                                        title={intlHelper(intl, 'step.dineBarn.bekrefterDektTiDagerSelv.info.titel')}>
                                        <FormattedMessage id="step.dineBarn.bekrefterDektTiDagerSelv.info" />
                                        <FormBlock>
                                            <ContentWithHeader
                                                header={intlHelper(
                                                    intl,
                                                    'step.dineBarn.bekrefterDektTiDagerSelv.label',
                                                )}>
                                                <ConfirmationCheckbox
                                                    label={intlHelper(intl, 'step.dineBarn.bekrefterDektTiDagerSelv')}
                                                    name={DineBarnFormFields.harDekketTiFørsteDagerSelv}
                                                    validate={getCheckedValidator()}
                                                    data-testid="bekrefterDektTiDagerSelv"
                                                />
                                            </ContentWithHeader>
                                        </FormBlock>
                                    </Block>
                                )}

                                {andreBarn.length === 0 && registrerteBarn.length === 0 && (
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
