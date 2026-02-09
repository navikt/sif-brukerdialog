import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateDurationMap } from '@navikt/sif-common-utils';

import { useOnValidSubmit, useSøknadContext } from '../../../hooks';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { AppText } from '../../../i18n';
import PersistStepFormValues from '../../../modules/persist-step-form-values/PersistStepFormValues';
import { SøknadContextState } from '../../../types';
import { lagreSøknadState } from '../../../utils';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import TilsynsordningForm, { omsorgstilbudFormComponents, OmsorgstilbudFormValues } from './TilsynsordningForm';
import {
    getTilsynsordningSøknadsdataFromFormValues,
    getTilsynsordningStepInitialValues,
} from './tilsynsordningStepUtils';

const { FormikWrapper } = omsorgstilbudFormComponents;

const TilsynsordningStep = () => {
    const stepId = StepId.TILSYNSORDNING;
    const {
        dispatch,
        state: {
            sak,
            søknadsdata: { tilsynsordning },
        },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmsorgstilbudFormValues) => {
        const tilsynsordningSøknadsdata = getTilsynsordningSøknadsdataFromFormValues(values);
        if (tilsynsordningSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadTilsynsordning(tilsynsordningSøknadsdata)];
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

    const oppdaterSøknadState = (omsorgsdager: DateDurationMap = {}) => {
        dispatch(
            actionsCreator.setSøknadTilsynsordning(
                getTilsynsordningSøknadsdataFromFormValues({ tilsynsdager: omsorgsdager }),
            ),
        );
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getTilsynsordningStepInitialValues(tilsynsordning, stepFormValues.tilsynsordning);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="omsorgstilbudStep.title" />
                </Heading>
                <BodyShort>
                    <AppText id="omsorgstilbudStep.info.1" />
                </BodyShort>
            </FormLayout.Guide>
            <VStack gap="space-32">
                <FormikWrapper
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    renderForm={() => {
                        return (
                            <>
                                <PersistStepFormValues stepId={stepId} />
                                <TilsynsordningForm
                                    goBack={goBack}
                                    søknadsperioder={sak.søknadsperioder}
                                    perioderMedTilsynsordning={sak.tilsynsordning.perioderMedTilsynsordning}
                                    opprinneligTilsynsdager={sak.tilsynsordning.dagerMedTilsynsordning}
                                    isSubmitting={isSubmitting}
                                    onTilsynsordningChanged={(values) => {
                                        oppdaterSøknadState(values);
                                    }}
                                />
                            </>
                        );
                    }}
                />
            </VStack>
        </SøknadStep>
    );
};

export default TilsynsordningStep;
