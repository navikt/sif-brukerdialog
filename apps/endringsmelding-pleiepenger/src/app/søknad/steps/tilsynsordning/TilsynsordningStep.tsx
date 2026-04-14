import { useOnValidSubmit, useSakUtledet, useSøknadContext } from '@app/hooks';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText } from '@app/i18n';
import PersistStepFormValues from '@app/modules/persist-step-form-values/PersistStepFormValues';
import { StepId } from '@app/søknad/config/StepId';
import actionsCreator from '@app/søknad/context/action/actionCreator';
import { useStepFormValuesContext } from '@app/søknad/context/StepFormValuesContext';
import SøknadStep from '@app/søknad/SøknadStep';
import { SøknadContextState } from '@app/types';
import { lagreSøknadState } from '@app/utils';
import { Heading, List, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateDurationMap } from '@navikt/sif-common-utils';

import { SkrivTilOssLink } from '../../../lenker';
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
    const { samletSøknadsperiodeTekstVariant3 } = useSakUtledet();

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
                <VStack gap="space-24">
                    <List>
                        <List.Item>
                            Her kan du sende inn endringer på hvor lenge barnet er i et omsorgstilbud.
                        </List.Item>
                        <List.Item>
                            Du kan gjøre endringer i perioden <strong>{samletSøknadsperiodeTekstVariant3}</strong>. Hvis
                            du skal gjøre endringer utenfor denne perioden, må du sende oss en melding via{' '}
                            <SkrivTilOssLink />.
                        </List.Item>
                        <List.Item>
                            Vi kan desverre ikke visen tiden i omsorgstilbud som allerede er registert på saken din.
                        </List.Item>
                    </List>
                </VStack>
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
                                    harFlereSøknadsperioder={sak.søknadsperioder.length > 1}
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
