import { Alert, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';
import AnnetBarnListAndDialog from '@navikt/sif-common-forms-ds/src/forms/annet-barn/AnnetBarnListAndDialog';
import { getDateToday } from '@navikt/sif-common-utils';
import { useIntl } from 'react-intl';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { nYearsAgo } from '../../../utils/aldersUtils';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import './omOmsorgenForBarn.css';
import {
    barnItemLabelRenderer,
    getBarnOptions,
    getOmOmsorgenForBarnStepInitialValues,
    getOmOmsorgenForBarnSøknadsdataFromFormValues,
} from './omOmsorgenForBarnStepUtils';
import RegistrerteBarnListeHeading from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnListeHeading';
import { RegistrertBarn } from '@navikt/sif-common-api';

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
                    values: { annetBarn = [], avtaleOmDeltBosted, harAleneomsorgFor = [] },
                    setFieldValue,
                }) => {
                    const alleBarn = [...registrertBarn, ...annetBarn];
                    const antallBarn = alleBarn.length;
                    const antallBarnManHarAleneomsorgFor = harAleneomsorgFor.length;

                    const harBarn = antallBarn > 0;

                    const harIkkeAleneomsorgForNoenBarn = antallBarnManHarAleneomsorgFor === 0;
                    const harAleneomsorgForNøyaktigEttBarn = antallBarnManHarAleneomsorgFor === 1;
                    const harAvtaleOmDeltBosted = avtaleOmDeltBosted === YesOrNo.YES;
                    const harSvartPåOmManHarAvtaleOmDeltBosted = avtaleOmDeltBosted !== YesOrNo.UNANSWERED;

                    const clearHarAvtaleOmDeltBostedFor = (harAvtale: string) => {
                        setFieldValue(
                            OmOmsorgenForBarnFormFields.harAvtaleOmDeltBostedFor,
                            harAvtale === YesOrNo.YES ? harAleneomsorgFor : [],
                        );
                    };

                    const kanIkkeFortsette = harIkkeAleneomsorgForNoenBarn || harAvtaleOmDeltBosted;

                    const advarsel =
                        harIkkeAleneomsorgForNoenBarn && harSvartPåOmManHarAvtaleOmDeltBosted
                            ? text('steg.omOmsorgenForBarna.deltBosted.velgMinstEttBarnMedDeltBostedAdvarsel')
                            : harAvtaleOmDeltBosted
                              ? text('steg.omOmsorgenForBarn.alleBarnMedDeltBosted')
                              : false;

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
                                    <RegistrerteBarnListeHeading level="2" size="medium">
                                        {text('steg.omOmsorgenForBarn.dineBarn.seksjonsTittel')}
                                    </RegistrerteBarnListeHeading>

                                    {registrertBarn.length > 0 && (
                                        <Block margin="l">
                                            <ItemList<RegistrertBarn>
                                                getItemId={(barn): string => barn.aktørId}
                                                getItemTitle={(barn): string => barn.etternavn}
                                                labelRenderer={(barn): React.ReactNode => barnItemLabelRenderer(barn)}
                                                items={registrertBarn}
                                            />
                                        </Block>
                                    )}
                                    <FormBlock>
                                        <Heading level="3" size="xsmall" spacing={true}>
                                            {annetBarn.length === 0
                                                ? text('steg.omOmsorgenForBarn.info.spm.andreBarn')
                                                : text('steg.omOmsorgenForBarn.info.spm.flereBarn')}
                                        </Heading>
                                        {text('steg.omOmsorgenForBarn.info.spm.text')}
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
                                            disallowedFødselsnumre={[
                                                søker.fødselsnummer,
                                                ...(annetBarn ?? []).map((barn) => barn.fnr),
                                            ]}
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
                                                    checkboxes={getBarnOptions(alleBarn)}
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
                                                        harAleneomsorgForNøyaktigEttBarn
                                                            ? 'steg.omOmsorgenForBarn.deltBosted.spm'
                                                            : 'steg.omOmsorgenForBarn.deltBosted.flereBarn.spm',
                                                    )}
                                                    name={OmOmsorgenForBarnFormFields.avtaleOmDeltBosted}
                                                    validate={getYesOrNoValidator()}
                                                    afterOnChange={clearHarAvtaleOmDeltBostedFor}
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
                                        </Block>
                                        {advarsel && (
                                            <Block margin="l">
                                                <Alert variant="warning">{advarsel}</Alert>
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
