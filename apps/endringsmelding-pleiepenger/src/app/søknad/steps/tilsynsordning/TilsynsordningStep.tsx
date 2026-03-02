import { AppText } from '@app/i18n';
import PersistStepFormValues from '@app/modules/persist-step-form-values/PersistStepFormValues';
import { Heading, List, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateDurationMap } from '@navikt/sif-common-utils';

import { useOnValidSubmit, useSøknadContext } from '../../../hooks';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { SøknadContextState } from '../../../types';
import { lagreSøknadState } from '../../../utils';
import { StepId } from '../../config/StepId';
import actionsCreator from '../../context/action/actionCreator';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import TilsynsordningForm, { tilsynsordningFormComponents, TilsynsordningFormValues } from './TilsynsordningForm';
import {
    getTilsynsordningSøknadsdataFromFormValues,
    getTilsynsordningStepInitialValues,
} from './tilsynsordningStepUtils';

const { FormikWrapper } = tilsynsordningFormComponents;

/**
 * Her gjenbrukes FormiWrapper etc for å ha det likt på tvers av steg. Dette kan skrives bort på sikt, da dette
 * egentlig ikke er nødvendig fordi det ikke er noen inline skjematikk i steget.
 */
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

    const onValidSubmitHandler = (values: TilsynsordningFormValues) => {
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

    const oppdaterSøknadState = (tilsynsdager: DateDurationMap = {}) => {
        dispatch(actionsCreator.setSøknadTilsynsordning(getTilsynsordningSøknadsdataFromFormValues({ tilsynsdager })));
        dispatch(actionsCreator.requestLagreSøknad());
    };

    const initialValues = getTilsynsordningStepInitialValues(tilsynsordning, stepFormValues.tilsynsordning);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="omsorgstilbudStep.title" />
                </Heading>
                <List>
                    <List.Item>Hva kan du endre på her?</List.Item>
                    <List.Item>Kort recap på omsorgstilbud - her er det mye info i søknaden</List.Item>
                    <List.Item>Melding/varsel om beredskap og nattvåk</List.Item>
                    <List.Item>
                        Hvordan påvirker perioder; f.eks. nattevåk/beredskap i én periode, men ikke annen periode. Hvis
                        en skal søke om dette i perioder hvor en ikke har søkt om det, må en bruke søknad
                    </List.Item>
                    <List.Item>
                        Få frem at dette er kun informasjon som du har sendt inn - trenger info om eventuell annen part
                    </List.Item>
                    <List.Item>Få frem forskjellen på 0 tid og ingen informasjon</List.Item>
                    <List.Item>Ferie ..</List.Item>
                </List>
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
                                    opprinneligTilsynsdager={sak.tilsynsordning.tilsynsdagerMap}
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
