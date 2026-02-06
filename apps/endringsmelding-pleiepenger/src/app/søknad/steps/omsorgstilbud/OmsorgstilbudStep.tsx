import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateDurationMap } from '@navikt/sif-common-utils';
import { useEffect, useState } from 'react';

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
import OmsorgstilbudForm, { omsorgstilbudFormComponents, OmsorgstilbudFormValues } from './OmsorgstilbudForm';
import { getOmsorgstilbudSøknadsdataFromFormValues, getOmsorgstilbudStepInitialValues } from './omsorgstilbudStepUtils';

const { FormikWrapper } = omsorgstilbudFormComponents;

const OmsorgstilbudStep = () => {
    const stepId = StepId.OMSORGSTILBUD;
    const {
        dispatch,
        state: { sak, søknadsdata },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const [omsorgstilbudChanged, setOmsorgstilbudChanged] = useState(false);
    useEffect(() => {
        if (omsorgstilbudChanged === true) {
            setOmsorgstilbudChanged(false);
            // persistSoknad({ stepID: StepID.OMSORGSTILBUD });
        }
    }, [omsorgstilbudChanged]);

    const onValidSubmitHandler = (values: OmsorgstilbudFormValues) => {
        const omsorgstilbudSøknadsdata = getOmsorgstilbudSøknadsdataFromFormValues(values);
        if (omsorgstilbudSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmsorgstilbud(omsorgstilbudSøknadsdata)];
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
        const omsorgstilbud = getOmsorgstilbudSøknadsdataFromFormValues({ omsorgsdager });
        dispatch(actionsCreator.setSøknadOmsorgstilbud(omsorgstilbud));
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getOmsorgstilbudStepInitialValues(søknadsdata, stepFormValues.omsorgstilbud);

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
                                <OmsorgstilbudForm
                                    goBack={goBack}
                                    søknadsperioder={sak.søknadsperioder}
                                    perioderMedTilsynsordning={sak.tilsynsordning.perioderMedTilsynsordning}
                                    opprinneligTilsynsdager={sak.tilsynsordning.dagerMedTilsynsordning}
                                    isSubmitting={isSubmitting}
                                    onOmsorgstilbudChanged={(values) => {
                                        console.log(values);
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

export default OmsorgstilbudStep;
