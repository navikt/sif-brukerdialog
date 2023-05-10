import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SøknadStep from '../../SøknadStep';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import {
    BarnMedAleneomsorg,
    getTidspunktForAleneomsorgStepInitialValues,
    getTidspunktForAleneomsorgSøknadsdataFromFormValues,
    mapAnnetBarnToBarnMedAleneomsorg,
    mapRegistrertBarnToBarnMedAleneomsorg,
} from './tidspunktForAleneomsorgStepUtils';
import TidspunktForBarn from './TidspunktForBarn';

export enum TidspunktForAleneomsorg {
    SISTE_2_ÅRENE = 'SISTE_2_ÅRENE',
    TIDLIGERE = 'TIDLIGERE',
}

export type AleneomsorgTidspunkt = {
    [fnr: string]: {
        tidspunktForAleneomsorg?: TidspunktForAleneomsorg;
        dato?: string;
    };
};

export enum AleneomsorgTidspunktField {
    tidspunktForAleneomsorg = 'tidspunktForAleneomsorg',
    dato = 'dato',
}

export enum TidspunktForAleneomsorgFormFields {
    aleneomsorgTidspunkt = 'aleneomsorgTidspunkt',
}

export interface TidspunktForAleneomsorgFormValues {
    aleneomsorgTidspunkt: AleneomsorgTidspunkt;
}

const { FormikWrapper, Form } = getTypedFormComponents<
    TidspunktForAleneomsorgFormFields,
    TidspunktForAleneomsorgFormValues,
    ValidationError
>();

const TidspunktForAleneomsorgStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata, registrertBarn },
    } = useSøknadContext();

    const stepId = StepId.TIDSPUNKT_FOR_ALENEOMSORG;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: TidspunktForAleneomsorgFormValues) => {
        const TidspunktForAleneomsorgSøknadsdata = getTidspunktForAleneomsorgSøknadsdataFromFormValues(values);
        if (TidspunktForAleneomsorgSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadTidspunktForAleneomsorg(TidspunktForAleneomsorgSøknadsdata)];
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

    const annetBarn = søknadsdata.omOmsorgenForBarn?.annetBarn || [];
    const harAleneomsorgFor = søknadsdata.omOmsorgenForBarn?.harAleneomsorgFor || [];

    const registrertBarnMedAleneOmsorg = registrertBarn.filter((barnet) =>
        (harAleneomsorgFor || []).includes(barnet.aktørId)
    );

    const annetBarnMedAleneOmsorg = annetBarn
        ? annetBarn.filter((barnet) => (harAleneomsorgFor || []).includes(barnet.fnr))
        : [];

    const barnMedAleneomsorg: BarnMedAleneomsorg[] = [
        ...registrertBarnMedAleneOmsorg.map((barn) => mapRegistrertBarnToBarnMedAleneomsorg(barn)),
        ...annetBarnMedAleneOmsorg.map((barn) => mapAnnetBarnToBarnMedAleneomsorg(barn)),
    ];

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getTidspunktForAleneomsorgStepInitialValues(
                    søknadsdata,
                    barnMedAleneomsorg,
                    stepFormValues[stepId]
                )}
                onSubmit={handleSubmit}
                renderForm={({ values: { aleneomsorgTidspunkt } }) => {
                    if (aleneomsorgTidspunkt === undefined) {
                        return 'FEIL';
                    }
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
                                    {intlHelper(intl, 'step.tidspunktForAleneomsorg.stepIntro')}
                                </SifGuidePanel>

                                <Block margin="xl" padBottom="xl">
                                    {barnMedAleneomsorg.map((barnMedAleneomsorg) => {
                                        return (
                                            <FormBlock key={barnMedAleneomsorg.idFnr}>
                                                <TidspunktForBarn
                                                    barnMedAleneomsorg={barnMedAleneomsorg}
                                                    aleneomsorgTidspunkt={
                                                        aleneomsorgTidspunkt[barnMedAleneomsorg.idFnr]
                                                    }
                                                />
                                            </FormBlock>
                                        );
                                    })}
                                </Block>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default TidspunktForAleneomsorgStep;
