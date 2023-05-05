import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import ItemList from '@navikt/sif-common-core-ds/lib/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/AnnetBarnListAndDialog';
import { nYearsAgo } from '../../../utils/aldersUtils';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
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
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { Alert, Heading } from '@navikt/ds-react';
import {
    getOmOmsorgenForBarnStepInitialValues,
    getOmOmsorgenForBarnSøknadsdataFromFormValues,
} from './omOmsorgenForBarnStepUtils';
import { prettifyDate } from '@navikt/sif-common-utils/lib/dateFormatter';
import { dateToday } from '@navikt/sif-common-utils/lib';

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

const bem = bemUtils('dineBarn');

const barnItemLabelRenderer = (registrertBarn: RegistrertBarn, intl: IntlShape): React.ReactNode => {
    return (
        <div className={bem.element('label')}>
            <div>{intlHelper(intl, 'step.om-omsorgen-for-barn.form.født')}</div>
            <div className={bem.element('fodselsdato')}>{prettifyDate(registrertBarn.fødselsdato)}</div>
            <div className={bem.element('navn')}>
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </div>
        </div>
    );
};

export const getBarnOptions = (registrertBarn: RegistrertBarn[] = [], andreBarn: AnnetBarn[] = [], intl: IntlShape) => {
    return [
        ...registrertBarn.map((barnet) => ({
            label: `${intlHelper(intl, 'step.om-omsorgen-for-barn.form.født')} ${prettifyDate(
                barnet.fødselsdato
            )} ${formatName(barnet.fornavn, barnet.etternavn)}`,
            value: barnet.aktørId,
            'data-testid': `harAleneomsorgFor-${barnet.aktørId}`,
        })),
        ...andreBarn.map((barnet) => ({
            label: `${intlHelper(intl, 'step.om-omsorgen-for-barn.form.født')} ${prettifyDate(barnet.fødselsdato)} ${
                barnet.navn
            }`,
            value: barnet.fnr,
            'data-testid': `harAleneomsorgFor-${barnet.fnr}`,
        })),
    ];
};

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
        }
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
                                newValue === YesOrNo.YES ? harAleneomsorgFor : []
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
                                <SifGuidePanel>
                                    <p>
                                        <FormattedMessage id="step.om-omsorgen-for-barn.stepIntro.1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.om-omsorgen-for-barn.stepIntro.2" />
                                    </p>
                                    <ul style={{ marginTop: '0.1rem' }}>
                                        <li>
                                            <FormattedMessage id="step.om-omsorgen-for-barn.stepIntro.2.list.item.1" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="step.om-omsorgen-for-barn.stepIntro.2.list.item.2" />
                                        </li>
                                    </ul>
                                </SifGuidePanel>
                                <Block margin="xl">
                                    <Heading level="2" size="xlarge">
                                        <FormattedMessage id="step.om-omsorgen-for-barn.dineBarn.seksjonsTittel" />
                                    </Heading>

                                    {registrertBarn.length > 0 && (
                                        <ItemList<RegistrertBarn>
                                            getItemId={(registrertBarn): string => registrertBarn.aktørId}
                                            getItemTitle={(registrertBarn): string => registrertBarn.etternavn}
                                            labelRenderer={(registrertBarn): React.ReactNode =>
                                                barnItemLabelRenderer(registrertBarn, intl)
                                            }
                                            items={registrertBarn}
                                        />
                                    )}
                                    <FormBlock>
                                        <ContentWithHeader
                                            header={
                                                annetBarn.length === 0
                                                    ? intlHelper(intl, 'step.om-omsorgen-for-barn.info.spm.andreBarn')
                                                    : intlHelper(intl, 'step.om-omsorgen-for-barn.info.spm.flereBarn')
                                            }>
                                            {intlHelper(intl, 'step.om-omsorgen-for-barn.info.spm.text')}
                                        </ContentWithHeader>
                                    </FormBlock>
                                    <Block margin="l">
                                        <AnnetBarnListAndDialog<OmOmsorgenForBarnFormFields>
                                            name={OmOmsorgenForBarnFormFields.annetBarn}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'step.om-omsorgen-for-barn.annetBarnListAndDialog.addLabel'
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'step.om-omsorgen-for-barn.annetBarnListAndDialog.listTitle'
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'step.om-omsorgen-for-barn.annetBarnListAndDialog.modalTitle'
                                                ),
                                            }}
                                            maxDate={dateToday}
                                            minDate={nYearsAgo(19)}
                                            disallowedFødselsnumre={[...[søker.fødselsnummer], ...annetBarnFnr]}
                                            aldersGrenseText={intlHelper(
                                                intl,
                                                'step.om-omsorgen-for-barn.formLeggTilBarn.aldersGrenseInfo'
                                            )}
                                            visBarnTypeValg={true}
                                            // onAfterChange={() => setAnnetBarnChanged(true)}
                                        />
                                    </Block>
                                </Block>
                                {harBarn && (
                                    <>
                                        <Block margin="xl">
                                            <Heading level="2" size="xlarge">
                                                <FormattedMessage id="step.om-omsorgen-for-barn.aleneomsorg.seksjonsTittel" />
                                            </Heading>

                                            <CheckboxGroup
                                                legend={intlHelper(
                                                    intl,
                                                    'step.om-omsorgen-for-barn.form.spm.hvilkeAvBarnaAleneomsorg'
                                                )}
                                                name={OmOmsorgenForBarnFormFields.harAleneomsorgFor}
                                                checkboxes={getBarnOptions(registrertBarn, annetBarn, intl)}
                                                validate={getListValidator({ required: true })}
                                                data-testid="harAleneomsorgFor"
                                            />
                                        </Block>
                                        <Block margin="xl">
                                            <Heading level="2" size="xlarge">
                                                <FormattedMessage id="step.om-omsorgen-for-barn.deltBosted.seksjonsTittel" />
                                            </Heading>

                                            <YesOrNoQuestion
                                                legend={intlHelper(
                                                    intl,
                                                    flereBarn
                                                        ? 'step.om-omsorgen-for-barn.deltBosted.flereBarn.spm'
                                                        : 'step.om-omsorgen-for-barn.deltBosted.spm'
                                                )}
                                                name={OmOmsorgenForBarnFormFields.avtaleOmDeltBosted}
                                                validate={getYesOrNoValidator()}
                                                afterOnChange={(newvalue) => clearHarAvtaleOmDeltBostedFor(newvalue)}
                                                description={
                                                    <ExpandableInfo
                                                        title={intlHelper(
                                                            intl,
                                                            'step.om-omsorgen-for-barn.deltBosted.description.tittel'
                                                        )}>
                                                        {intlHelper(
                                                            intl,
                                                            'step.om-omsorgen-for-barn.deltBosted.description'
                                                        )}
                                                    </ExpandableInfo>
                                                }
                                                data-testid="avtaleOmDeltBosted"
                                            />

                                            {visDeltBostedBarnValg && (
                                                <Block margin="xl">
                                                    <CheckboxGroup
                                                        legend={intlHelper(
                                                            intl,
                                                            'step.om-omsorgen-for-barn.deltBosted'
                                                        )}
                                                        name={OmOmsorgenForBarnFormFields.harAvtaleOmDeltBostedFor}
                                                        checkboxes={getBarnOptions(registrertBarn, annetBarn, intl)}
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
                                                    {intlHelper(
                                                        intl,
                                                        'step.om-omsorgen-for-barn.alleBarnMedDeltBosted'
                                                    )}
                                                </Alert>
                                            </Block>
                                        )}
                                    </>
                                )}

                                {!harBarn && (
                                    <Block margin="l">
                                        <Alert variant="warning">
                                            {intlHelper(intl, 'step.om-omsorgen-for-barn.ingenbarn')}
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
