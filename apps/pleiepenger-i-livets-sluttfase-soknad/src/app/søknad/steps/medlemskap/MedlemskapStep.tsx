import { Link } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { dateToday } from '@navikt/sif-common-utils';
import { useIntl } from 'react-intl';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import getLenker from '../../../lenker';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';
import {
    getMedlemskapDateRanges,
    getMedlemskapStepInitialValues,
    getMedlemskapSøknadsdataFromFormValues,
} from './medlemskapStepUtils';
import { AppText } from '../../../i18n';

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
    const intl = useIntl();
    const { neste12Måneder, siste12Måneder } = getMedlemskapDateRanges(dateToday);
    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const stepId = StepId.MEDLEMSKAP;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

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
                                <SifGuidePanel>
                                    {intlHelper(intl, 'step.medlemskap.info.1')}
                                    <Link href={getLenker().medlemskap} target="_blank">
                                        <AppText id="step.medlemskap.info.2" />
                                    </Link>
                                    .
                                </SifGuidePanel>
                                <FormBlock>
                                    <YesOrNoQuestion
                                        legend={intlHelper(intl, 'step.medlemskap.annetLandSiste12.spm')}
                                        name={MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd}
                                        validate={getYesOrNoValidator()}
                                        description={
                                            <ExpandableInfo title={intlHelper(intl, 'step.medlemskap.hvaBetyrDette')}>
                                                {intlHelper(intl, 'step.medlemskap.annetLandSiste12.hjelp')}
                                            </ExpandableInfo>
                                        }
                                    />
                                </FormBlock>
                                {harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                                    <FormBlock margin="l">
                                        <BostedUtlandListAndDialog<MedlemskapFormFields>
                                            name={MedlemskapFormFields.utenlandsoppholdSiste12Mnd}
                                            minDate={siste12Måneder.from}
                                            maxDate={siste12Måneder.to}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'step.medlemskap.utenlandsopphold.leggTilLabel',
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'step.medlemskap.annetLandSiste12.listeTittel',
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'step.medlemskap.annetLandSiste12.listeTittel',
                                                ),
                                            }}
                                            validate={validateUtenlandsoppholdSiste12Mnd}
                                        />
                                    </FormBlock>
                                )}
                                <FormBlock>
                                    <YesOrNoQuestion
                                        legend={intlHelper(intl, 'step.medlemskap.annetLandNeste12.spm')}
                                        name={MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd}
                                        validate={getYesOrNoValidator()}
                                        description={
                                            <ExpandableInfo title={intlHelper(intl, 'step.medlemskap.hvaBetyrDette')}>
                                                {intlHelper(intl, 'step.medlemskap.annetLandNeste12.hjelp')}
                                            </ExpandableInfo>
                                        }
                                    />
                                </FormBlock>
                                {skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                                    <FormBlock margin="l">
                                        <BostedUtlandListAndDialog<MedlemskapFormFields>
                                            name={MedlemskapFormFields.utenlandsoppholdNeste12Mnd}
                                            minDate={neste12Måneder.from}
                                            maxDate={neste12Måneder.to}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'step.medlemskap.utenlandsopphold.leggTilLabel',
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'step.medlemskap.annetLandNeste12.listeTittel',
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'step.medlemskap.annetLandNeste12.listeTittel',
                                                ),
                                            }}
                                            validate={validateUtenlandsoppholdNeste12Mnd}
                                        />
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
