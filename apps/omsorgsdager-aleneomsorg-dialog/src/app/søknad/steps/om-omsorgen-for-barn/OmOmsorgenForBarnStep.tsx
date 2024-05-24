import { Alert, Heading } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { getDateToday } from '@navikt/sif-common-utils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { nYearsAgo } from '../../../utils/aldersUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import {
    barnItemLabelRenderer,
    getBarnOptions,
    getOmOmsorgenForBarnStepInitialValues,
    getOmOmsorgenForBarnSøknadsdataFromFormValues,
} from './omOmsorgenForBarnStepUtils';
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
    const { text } = useAppIntl();
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
                                        <AppText id="steg.omOmsorgenForBarn.dineBarn.seksjonsTittel" />
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
                                                    ? text('steg.omOmsorgenForBarn.info.spm.andreBarn')
                                                    : text('steg.omOmsorgenForBarn.info.spm.flereBarn')
                                            }>
                                            {text('steg.omOmsorgenForBarn.info.spm.text')}
                                        </ContentWithHeader>
                                    </FormBlock>
                                    <Block margin="l">
                                        <AnnetBarnListAndDialog<OmOmsorgenForBarnFormFields>
                                            name={OmOmsorgenForBarnFormFields.annetBarn}
                                            labels={{
                                                addLabel: text(
                                                    'steg.omOmsorgenForBarn.annetBarnListAndDialog.addLabel',
                                                ),
                                                listTitle: text(
                                                    'steg.omOmsorgenForBarn.annetBarnListAndDialog.listTitle',
                                                ),
                                                modalTitle: text(
                                                    'steg.omOmsorgenForBarn.annetBarnListAndDialog.modalTitle',
                                                ),
                                            }}
                                            maxDate={getDateToday()}
                                            minDate={nYearsAgo(19)}
                                            disallowedFødselsnumre={[...[søker.fødselsnummer], ...annetBarnFnr]}
                                            aldersGrenseText={text(
                                                'steg.omOmsorgenForBarn.formLeggTilBarn.aldersGrenseInfo',
                                            )}
                                            visBarnTypeValg={true}
                                        />
                                    </Block>
                                </Block>
                                {harBarn && (
                                    <>
                                        <Block margin="xxl">
                                            <Heading level="2" size="medium">
                                                <AppText id="steg.omOmsorgenForBarn.aleneomsorg.seksjonsTittel" />
                                            </Heading>

                                            <Block margin="l">
                                                <CheckboxGroup
                                                    legend={text(
                                                        'steg.omOmsorgenForBarn.form.spm.hvilkeAvBarnaAleneomsorg',
                                                    )}
                                                    name={OmOmsorgenForBarnFormFields.harAleneomsorgFor}
                                                    checkboxes={getBarnOptions(registrertBarn, annetBarn)}
                                                    validate={getListValidator({ required: true })}
                                                />
                                            </Block>
                                        </Block>
                                        <Block margin="xxl">
                                            <Heading level="2" size="medium">
                                                <AppText id="steg.omOmsorgenForBarn.deltBosted.seksjonsTittel" />
                                            </Heading>
                                            <Block margin="l">
                                                <YesOrNoQuestion
                                                    legend={text(
                                                        flereBarn
                                                            ? 'steg.omOmsorgenForBarn.deltBosted.flereBarn.spm'
                                                            : 'steg.omOmsorgenForBarn.deltBosted.spm',
                                                    )}
                                                    name={OmOmsorgenForBarnFormFields.avtaleOmDeltBosted}
                                                    validate={getYesOrNoValidator()}
                                                    afterOnChange={(newvalue) =>
                                                        clearHarAvtaleOmDeltBostedFor(newvalue)
                                                    }
                                                    description={
                                                        <ExpandableInfo
                                                            title={text(
                                                                'steg.omOmsorgenForBarn.deltBosted.description.tittel',
                                                            )}>
                                                            <AppText id="steg.omOmsorgenForBarn.deltBosted.description" />
                                                        </ExpandableInfo>
                                                    }
                                                />
                                            </Block>

                                            {visDeltBostedBarnValg && (
                                                <Block margin="xl">
                                                    <CheckboxGroup
                                                        legend={text('steg.omOmsorgenForBarn.deltBosted')}
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
                                                    {text('steg.omOmsorgenForBarn.alleBarnMedDeltBosted')}
                                                </Alert>
                                            </Block>
                                        )}
                                    </>
                                )}

                                {!harBarn && (
                                    <Block margin="l">
                                        <Alert variant="warning">{text('steg.omOmsorgenForBarn.ingenbarn')}</Alert>
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
