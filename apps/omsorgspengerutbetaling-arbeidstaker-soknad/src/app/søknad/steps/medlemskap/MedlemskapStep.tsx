import { Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { dateToday } from '@navikt/sif-common-utils/src/dateUtils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';
import {
    getMedlemskapDateRanges,
    getMedlemskapStepInitialValues,
    getMedlemskapSøknadsdataFromFormValues,
} from './medlemskapStepUtils';

export enum MedlemskapFormFields {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: Utenlandsopphold[];
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: Utenlandsopphold[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    MedlemskapFormFields,
    MedlemskapFormValues,
    ValidationError
>();

const MedlemskapStep = () => {
    const { text, intl } = useAppIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemskapDateRanges(dateToday);
    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const stepId = StepId.MEDLEMSKAP;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: MedlemskapFormValues) => {
        const MedlemskapSøknadsdata = getMedlemskapSøknadsdataFromFormValues(values);
        if (MedlemskapSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadMedlemskap(MedlemskapSøknadsdata)];
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
                initialValues={getMedlemskapStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { harBoddUtenforNorgeSiste12Mnd, skalBoUtenforNorgeNeste12Mnd } }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <Block padBottom="xxl">
                                    <SifGuidePanel>
                                        {text('step.medlemskap.info.1')}
                                        <Link href={getLenker().medlemskap} target="_blank">
                                            <AppText id="step.medlemskap.info.2" />
                                        </Link>
                                        .
                                    </SifGuidePanel>
                                </Block>
                                <YesOrNoQuestion
                                    legend={text('step.medlemskap.annetLandSiste12.spm')}
                                    name={MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd}
                                    validate={getYesOrNoValidator()}
                                    description={
                                        <ExpandableInfo title={text('step.medlemskap.hvaBetyrDette')}>
                                            {text('step.medlemskap.annetLandSiste12.hjelp')}
                                        </ExpandableInfo>
                                    }
                                    data-testid="medlemskap-annetLandSiste12"
                                />
                                {harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                                    <FormBlock margin="l">
                                        <div data-testid="bostedUtlandList-annetLandSiste12">
                                            <BostedUtlandListAndDialog<MedlemskapFormFields>
                                                name={MedlemskapFormFields.utenlandsoppholdSiste12Mnd}
                                                minDate={siste12Måneder.from}
                                                maxDate={siste12Måneder.to}
                                                labels={{
                                                    addLabel: text('step.medlemskap.utenlandsopphold.leggTilLabel'),
                                                    listTitle: text('step.medlemskap.annetLandSiste12.listeTittel'),
                                                    modalTitle: text('step.medlemskap.annetLandSiste12.listeTittel'),
                                                }}
                                                validate={validateUtenlandsoppholdSiste12Mnd}
                                            />
                                        </div>
                                    </FormBlock>
                                )}
                                <FormBlock>
                                    <YesOrNoQuestion
                                        legend={text('step.medlemskap.annetLandNeste12.spm')}
                                        name={MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd}
                                        validate={getYesOrNoValidator()}
                                        description={
                                            <ExpandableInfo title={text('step.medlemskap.hvaBetyrDette')}>
                                                {text('step.medlemskap.annetLandNeste12.hjelp')}
                                            </ExpandableInfo>
                                        }
                                        data-testid="medlemskap-annetLandNeste12"
                                    />
                                </FormBlock>
                                {skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                                    <FormBlock margin="l">
                                        <div data-testid="bostedUtlandList-annetLandNeste12">
                                            <BostedUtlandListAndDialog<MedlemskapFormFields>
                                                name={MedlemskapFormFields.utenlandsoppholdNeste12Mnd}
                                                minDate={neste12Måneder.from}
                                                maxDate={neste12Måneder.to}
                                                labels={{
                                                    addLabel: text('step.medlemskap.utenlandsopphold.leggTilLabel'),
                                                    listTitle: text('step.medlemskap.annetLandNeste12.listeTittel'),
                                                    modalTitle: text('step.medlemskap.annetLandNeste12.listeTittel'),
                                                }}
                                                validate={validateUtenlandsoppholdNeste12Mnd}
                                            />
                                        </div>
                                    </FormBlock>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default MedlemskapStep;
