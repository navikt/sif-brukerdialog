import { Heading } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { FormattedMessage, useIntl } from 'react-intl';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    cleanHarUtvidetRettFor,
    getBarnAlderInfo,
    getDineBarnStepInitialValues,
    getDineBarnSøknadsdataFromFormValues,
    getVisHarAleneomsorgSpørsmål,
    getVisHarUtvidetRettForSpørsmål,
    getVisHarSyktBarnSpørsmål,
} from './dineBarnStepUtils';
import DineBarnStepIntro from './parts/DineBarnStepIntro';
import RegistrerteBarnPart from './parts/RegistrerteBarnPart';
import AndreBarnPart from './parts/AndreBarnPart';
import HarSyktBarnSpørsmål from './parts/HarSyktBarnSpørsmål';
import HarAleneomsorgSpørsmål from './parts/HarAleneomsorgSpørsmål';
import HarUtvidetRettForPart from './parts/HarUtvidetRettForPart';
import DineBarnMeldingerPart from './parts/DineBarnMeldingerPart';
// import { FormikValuesObserver } from '@navikt/sif-common-formik-ds';

export enum DineBarnFormFields {
    andreBarn = 'andreBarn',
    harSyktBarn = 'harSyktBarn',
    harAleneomsorg = 'harAleneomsorg',
    harUtvidetRettFor = 'harUtvidetRettFor',
    harDekketTiFørsteDagerSelv = 'harDekketTiFørsteDagerSelv',
}

export interface DineBarnFormValues {
    [DineBarnFormFields.andreBarn]?: AnnetBarn[];
    [DineBarnFormFields.harDekketTiFørsteDagerSelv]?: boolean;
    [DineBarnFormFields.harSyktBarn]?: YesOrNo;
    [DineBarnFormFields.harAleneomsorg]?: YesOrNo;
    [DineBarnFormFields.harUtvidetRettFor]: string[];
}

const { FormikWrapper, Form } = getTypedFormComponents<DineBarnFormFields, DineBarnFormValues, ValidationError>();

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

    const persistAndreBarnChangedValues = (values: Partial<DineBarnFormValues>) => {
        dispatch(actionsCreator.setSøknadTempFormData({ stepId, values }));
        persistTempFormValues({ stepId, values });
    };

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getDineBarnStepInitialValues(søknadsdata, tempFormData, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        andreBarn = [],
                        harSyktBarn,
                        harUtvidetRettFor,
                        harAleneomsorg,
                        harDekketTiFørsteDagerSelv,
                    },
                }) => {
                    const oppdatereAndreBarn = (values: AnnetBarn[]) => {
                        persistAndreBarnChangedValues({
                            andreBarn: values,
                            harSyktBarn,
                            harUtvidetRettFor: harUtvidetRettFor
                                ? cleanHarUtvidetRettFor(harUtvidetRettFor, values, registrerteBarn)
                                : harUtvidetRettFor,
                            harDekketTiFørsteDagerSelv,
                        });
                    };

                    const barnAlderInfo = getBarnAlderInfo(registrerteBarn, andreBarn);

                    const visHarSyktBarnSpørsmål = getVisHarSyktBarnSpørsmål(barnAlderInfo);

                    const visHarAleneomsorgSpørsmål = getVisHarAleneomsorgSpørsmål(barnAlderInfo, harSyktBarn);

                    const visHarUtvidetRettForSpørsmål = getVisHarUtvidetRettForSpørsmål(barnAlderInfo, harSyktBarn);

                    // const scenario = getDineBarnScenario(
                    //     registrerteBarn,
                    //     andreBarn,
                    //     harSyktBarn,
                    //     harAleneomsorg,
                    //     harUtvidetRettFor,
                    // );

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
                                <DineBarnStepIntro />

                                <FormBlock margin="xxl">
                                    <Heading level="2" size="medium">
                                        <FormattedMessage id="step.dineBarn.seksjonsTittel" />
                                    </Heading>
                                </FormBlock>

                                <RegistrerteBarnPart registrerteBarn={registrerteBarn} />

                                <AndreBarnPart
                                    søkerFnr={søker.fødselsnummer}
                                    andreBarn={andreBarn}
                                    onAndreBarnChange={oppdatereAndreBarn}
                                />

                                {visHarSyktBarnSpørsmål ? (
                                    <HarSyktBarnSpørsmål registrerteBarn={registrerteBarn} andreBarn={andreBarn} />
                                ) : null}

                                {visHarAleneomsorgSpørsmål ? <HarAleneomsorgSpørsmål /> : null}

                                {visHarUtvidetRettForSpørsmål ? (
                                    <>
                                        <HarUtvidetRettForPart
                                            registrerteBarn={registrerteBarn}
                                            andreBarn={andreBarn}
                                        />
                                        {harAleneomsorg === YesOrNo.NO ? <>Ahosdf</> : null}
                                    </>
                                ) : null}

                                <DineBarnMeldingerPart
                                    barnAlderInfo={barnAlderInfo}
                                    harAleneomsorg={harAleneomsorg}
                                    harSyktBarn={harSyktBarn}
                                />

                                {/* {minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn) === false && (
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
                                                                checkboxes={getBarnOptions(registrerteBarn, andreBarn)}
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
                                )} */}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default DineBarnStep;
