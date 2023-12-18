import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { nYearsAgo } from '../../../utils/aldersUtils';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import actionsCreator from '../../context/action/actionCreator';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Alert, Heading } from '@navikt/ds-react';
import {
    barnItemLabelRenderer,
    getBarnOptions,
    getOmOmsorgenForBarnStepInitialValues,
    getOmOmsorgenForBarnSøknadsdataFromFormValues,
} from './omOmsorgenForBarnStepUtils';
import { dateToday } from '@navikt/sif-common-utils';
import './omOmsorgenForBarn.css';

export enum OmOmsorgenForBarnFormFields {
    annetBarn = 'annetBarn',
    harAleneomsorgFor = 'harAleneomsorgFor',
    avtaleOmDeltBosted = 'avtaleOmDeltBosted',
    harAvtaleOmDeltBostedFor = 'harAvtaleOmDeltBostedFor',
}

export interface OmOmsorgenForBarnFormValues {
    [OmOmsorgenForBarnFormFields.annetBarn]?: AnnetBarn[];
    [OmOmsorgenForBarnFormFields.harAleneomsorgFor]?: string[];
    [OmOmsorgenForBarnFormFields.avtaleOmDeltBosted]?: YesOrNo;
    [OmOmsorgenForBarnFormFields.harAvtaleOmDeltBostedFor]?: string[];
}

const { FormikWrapper, Form, YesOrNoQuestion, CheckboxGroup } = getTypedFormComponents<
    OmOmsorgenForBarnFormFields,
    OmOmsorgenForBarnFormValues,
    ValidationError
>();

const OmOmsorgenForBarnStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata, søker, registrertBarn },
    } = useSøknadContext();

    const stepId = StepId.OM_OMSORGEN_FOR_BARN;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmOmsorgenForBarnFormValues) => {
        const OmOmsorgenForBarnSøknadsdata = getOmOmsorgenForBarnSøknadsdataFromFormValues(values, registrertBarn);
        if (OmOmsorgenForBarnSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmOmsorgenForBarn(OmOmsorgenForBarnSøknadsdata)];
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
                initialValues={getOmOmsorgenForBarnStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: { annetBarn = [], harAvtaleOmDeltBostedFor, avtaleOmDeltBosted, harAleneomsorgFor = [] },
                    setFieldValue,
                }) => {
                    const annetBarnFnr = annetBarn ? annetBarn.map((barn) => barn.fnr) : [];

                    const harBarn = registrertBarn.length > 0 || annetBarn.length > 0;
                    const flereBarn = registrertBarn.length + annetBarn.length > 1;
                    const ettBarn = registrertBarn.length + annetBarn.length === 1;
                    const visDeltBostedBarnValg = avtaleOmDeltBosted === YesOrNo.YES && flereBarn;

                    const filtrertBarn = harAvtaleOmDeltBostedFor
                        ? registrertBarn.filter((barnet) => !harAvtaleOmDeltBostedFor.includes(barnet.aktørId))
                        : registrertBarn;
                    const filtrertAnnetBarn = harAvtaleOmDeltBostedFor
                        ? annetBarn.filter((barnet) => !harAvtaleOmDeltBostedFor.includes(barnet.fnr))
                        : annetBarn;

                    const alleBarnMedDeltBosted =
                        filtrertBarn.length + filtrertAnnetBarn.length === 0 && avtaleOmDeltBosted === YesOrNo.YES;

                    const ettBarnOgDeltBosted =
                        ettBarn && harAleneomsorgFor.length > 0 && avtaleOmDeltBosted === YesOrNo.YES;

                    const barnMedDeltBostedHarAleneomsorg = harAvtaleOmDeltBostedFor
                        ? harAvtaleOmDeltBostedFor.find((barnId) => (harAleneomsorgFor || []).includes(barnId)) !==
                          undefined
                        : false;

                    const clearHarAvtaleOmDeltBostedFor = (newValue: string) => {
                        if (ettBarn) {
                            setFieldValue(
                                OmOmsorgenForBarnFormFields.harAvtaleOmDeltBostedFor,
                                newValue === YesOrNo.YES ? harAleneomsorgFor : [],
                            );
                        }
                        if (flereBarn) {
                            setFieldValue(OmOmsorgenForBarnFormFields.harAvtaleOmDeltBostedFor, []);
                        }
                    };
                    const kanIkkeFortsette =
                        !harBarn || alleBarnMedDeltBosted || ettBarnOgDeltBosted || barnMedDeltBostedHarAleneomsorg;
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={kanIkkeFortsette || isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <Block margin="xxl">
                                    <Heading level="2" size="medium">
                                        <FormattedMessage id="step.omOmsorgenForBarn.dineBarn.seksjonsTittel" />
                                    </Heading>

                                    {registrertBarn.length > 0 && (
                                        <Block margin="l">
                                            <ItemList<RegistrertBarn>
                                                getItemId={(registrertBarn): string => registrertBarn.aktørId}
                                                getItemTitle={(registrertBarn): string => registrertBarn.etternavn}
                                                labelRenderer={(registrertBarn): React.ReactNode =>
                                                    barnItemLabelRenderer(registrertBarn)
                                                }
                                                items={registrertBarn}
                                            />
                                        </Block>
                                    )}
                                    <FormBlock>
                                        <ContentWithHeader
                                            header={
                                                annetBarn.length === 0
                                                    ? intlHelper(intl, 'step.omOmsorgenForBarn.info.spm.andreBarn')
                                                    : intlHelper(intl, 'step.omOmsorgenForBarn.info.spm.flereBarn')
                                            }>
                                            {intlHelper(intl, 'step.omOmsorgenForBarn.info.spm.text')}
                                        </ContentWithHeader>
                                    </FormBlock>
                                    <Block margin="l">
                                        <AnnetBarnListAndDialog<OmOmsorgenForBarnFormFields>
                                            name={OmOmsorgenForBarnFormFields.annetBarn}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'step.omOmsorgenForBarn.annetBarnListAndDialog.addLabel',
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'step.omOmsorgenForBarn.annetBarnListAndDialog.listTitle',
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'step.omOmsorgenForBarn.annetBarnListAndDialog.modalTitle',
                                                ),
                                            }}
                                            maxDate={dateToday}
                                            minDate={nYearsAgo(19)}
                                            disallowedFødselsnumre={[...[søker.fødselsnummer], ...annetBarnFnr]}
                                            aldersGrenseText={intlHelper(
                                                intl,
                                                'step.omOmsorgenForBarn.formLeggTilBarn.aldersGrenseInfo',
                                            )}
                                            visBarnTypeValg={true}
                                            // onAfterChange={() => setAnnetBarnChanged(true)}
                                        />
                                    </Block>
                                </Block>
                                {harBarn && (
                                    <>
                                        <Block margin="xxl">
                                            <Heading level="2" size="medium">
                                                <FormattedMessage id="step.omOmsorgenForBarn.aleneomsorg.seksjonsTittel" />
                                            </Heading>

                                            <Block margin="l">
                                                <CheckboxGroup
                                                    legend={intlHelper(
                                                        intl,
                                                        'step.omOmsorgenForBarn.form.spm.hvilkeAvBarnaAleneomsorg',
                                                    )}
                                                    name={OmOmsorgenForBarnFormFields.harAleneomsorgFor}
                                                    checkboxes={getBarnOptions(registrertBarn, annetBarn)}
                                                    validate={getListValidator({ required: true })}
                                                />
                                            </Block>
                                        </Block>
                                        <Block margin="xxl">
                                            <Heading level="2" size="medium">
                                                <FormattedMessage id="step.omOmsorgenForBarn.deltBosted.seksjonsTittel" />
                                            </Heading>
                                            <Block margin="l">
                                                <YesOrNoQuestion
                                                    legend={intlHelper(
                                                        intl,
                                                        flereBarn
                                                            ? 'step.omOmsorgenForBarn.deltBosted.flereBarn.spm'
                                                            : 'step.omOmsorgenForBarn.deltBosted.spm',
                                                    )}
                                                    name={OmOmsorgenForBarnFormFields.avtaleOmDeltBosted}
                                                    validate={getYesOrNoValidator()}
                                                    afterOnChange={(newvalue) =>
                                                        clearHarAvtaleOmDeltBostedFor(newvalue)
                                                    }
                                                    description={
                                                        <ExpandableInfo
                                                            title={intlHelper(
                                                                intl,
                                                                'step.omOmsorgenForBarn.deltBosted.description.tittel',
                                                            )}>
                                                            <FormattedMessage id="step.omOmsorgenForBarn.deltBosted.description" />
                                                        </ExpandableInfo>
                                                    }
                                                />
                                            </Block>

                                            {visDeltBostedBarnValg && (
                                                <Block margin="xl">
                                                    <CheckboxGroup
                                                        legend={intlHelper(intl, 'step.omOmsorgenForBarn.deltBosted')}
                                                        name={OmOmsorgenForBarnFormFields.harAvtaleOmDeltBostedFor}
                                                        checkboxes={getBarnOptions(registrertBarn, annetBarn)}
                                                        validate={getListValidator({ required: true })}
                                                    />
                                                </Block>
                                            )}
                                        </Block>
                                        {(alleBarnMedDeltBosted ||
                                            ettBarnOgDeltBosted ||
                                            barnMedDeltBostedHarAleneomsorg) && (
                                            <Block margin="l">
                                                <Alert variant="warning">
                                                    {intlHelper(intl, 'step.omOmsorgenForBarn.alleBarnMedDeltBosted')}
                                                </Alert>
                                            </Block>
                                        )}
                                    </>
                                )}

                                {!harBarn && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            {intlHelper(intl, 'step.omOmsorgenForBarn.ingenbarn')}
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

export default OmOmsorgenForBarnStep;
