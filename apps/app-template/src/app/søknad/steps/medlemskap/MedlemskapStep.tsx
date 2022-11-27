import { Link } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/bosted-utland/BostedUtlandListAndDialog';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import getLenker from '../../../lenker';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd } from './medlemskapFieldValidations';
import {
    getMedlemskapStepInitialValues,
    getMedlemskapSøknadsdataFromFormValues,
    getMedlemsskapDateRanges,
} from './medlemskapStepUtils';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';

export enum MedlemskapFormFields {
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
}

export interface MedlemskapFormValues {
    [MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdSiste12Mnd]: BostedUtland[];
    [MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [MedlemskapFormFields.utenlandsoppholdNeste12Mnd]: BostedUtland[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<MedlemskapFormFields, MedlemskapFormValues>();

const MedlemskapStep = () => {
    const {
        dispatch,
        state: { søknadsdata, søknadsdato },
    } = useSøknadContext();
    const intl = useIntl();
    const stepId = StepId.MEDLEMSKAP;

    const stepConfig = getSøknadStepConfig(søknadsdata);
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: MedlemskapFormValues) => {
        const medlemskapSøknadsdata = getMedlemskapSøknadsdataFromFormValues(values);
        if (medlemskapSøknadsdata) {
            clearStepFormValues(stepId);
            dispatch(actionsCreator.setSøknadMedlemskap(medlemskapSøknadsdata));
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.MEDLEMSKAP,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    const { neste12Måneder, siste12Måneder } = getMedlemsskapDateRanges(søknadsdato);
    return (
        <SøknadStep stepId={StepId.MEDLEMSKAP}>
            <FormikWrapper
                initialValues={getMedlemskapStepInitialValues(søknadsdata, stepFormValues?.medlemskap)}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                renderForm={({ values: { harBoddUtenforNorgeSiste12Mnd, skalBoUtenforNorgeNeste12Mnd } }) => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form onBack={goBack} submitDisabled={hasInvalidSteps}>
                            <Block padBottom="xxl">
                                <SifGuidePanel>
                                    {intlHelper(intl, 'step.medlemskap.veileder')}{' '}
                                    <Link href={getLenker().medlemskap} target="_blank">
                                        nav.no
                                    </Link>
                                    .
                                </SifGuidePanel>
                            </Block>
                            <YesOrNoQuestion
                                legend={intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.spm')}
                                name={MedlemskapFormFields.harBoddUtenforNorgeSiste12Mnd}
                                validate={getYesOrNoValidator()}
                                description={
                                    <ExpandableInfo title={intlHelper(intl, 'HvaBetyrDette')}>
                                        {intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.hjelp')}
                                    </ExpandableInfo>
                                }
                                data-testid="medlemsskap-annetLandSiste12"
                            />
                            {harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                                <FormBlock margin="l">
                                    <div data-testid="bostedUtlandList-annetLandSiste12">
                                        <BostedUtlandListAndDialog<MedlemskapFormFields>
                                            name={MedlemskapFormFields.utenlandsoppholdSiste12Mnd}
                                            minDate={siste12Måneder.from}
                                            maxDate={siste12Måneder.to}
                                            labels={{
                                                addLabel: intlHelper(intl, 'step.medlemskap.leggTilKnapp'),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'steg.medlemsskap.annetLandSiste12.listeTittel'
                                                ),
                                                modalTitle: intlHelper(intl, 'step.medlemskap.utenlandsoppholdSiste12'),
                                            }}
                                            validate={validateUtenlandsoppholdSiste12Mnd}
                                        />
                                    </div>
                                </FormBlock>
                            )}
                            <FormBlock>
                                <YesOrNoQuestion
                                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.spm')}
                                    name={MedlemskapFormFields.skalBoUtenforNorgeNeste12Mnd}
                                    validate={getYesOrNoValidator()}
                                    description={
                                        <ExpandableInfo title={intlHelper(intl, 'HvaBetyrDette')}>
                                            {intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.hjelp')}
                                        </ExpandableInfo>
                                    }
                                    data-testid="medlemsskap-annetLandNeste12"
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
                                                addLabel: intlHelper(intl, 'step.medlemskap.leggTilKnapp'),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'steg.medlemsskap.annetLandNeste12.listeTittel'
                                                ),
                                                modalTitle: intlHelper(intl, 'step.medlemskap.utenlandsoppholdNeste12'),
                                            }}
                                            validate={validateUtenlandsoppholdNeste12Mnd}
                                        />
                                    </div>
                                </FormBlock>
                            )}
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default MedlemskapStep;
