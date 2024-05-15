import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
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
        },
    );

    const annetBarn = søknadsdata.omOmsorgenForBarn?.annetBarn || [];
    const harAleneomsorgFor = søknadsdata.omOmsorgenForBarn?.harAleneomsorgFor || [];

    const registrertBarnMedAleneOmsorg = registrertBarn.filter((barnet) =>
        (harAleneomsorgFor || []).includes(barnet.aktørId),
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
                    stepFormValues[stepId],
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
                                    <p>
                                        <AppText id="step.tidspunktForAleneomsorg.stepIntro" />
                                    </p>
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
