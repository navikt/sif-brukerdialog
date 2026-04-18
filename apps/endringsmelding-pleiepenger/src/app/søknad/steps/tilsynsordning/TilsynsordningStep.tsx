import PersistStepFormValues from '@app/components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit, useSakUtledet, useSøknadContext } from '@app/hooks';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText } from '@app/i18n';
import { StepId } from '@app/søknad/config/StepId';
import actionsCreator from '@app/søknad/context/action/actionCreator';
import { useStepFormValuesContext } from '@app/søknad/context/StepFormValuesContext';
import SøknadStep from '@app/søknad/SøknadStep';
import { SøknadContextState } from '@app/types';
import { lagreSøknadState } from '@app/utils';
import { Heading, Link, List, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateDurationMap } from '@navikt/sif-common-utils';

import { getLenker, SkrivTilOssLink } from '../../../lenker';
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
                            <AppText id="omsorgstilbudStep.guide.listItem.1" />
                        </List.Item>
                        <List.Item>
                            <AppText
                                id="omsorgstilbudStep.guide.listItem.2"
                                values={{
                                    periode: samletSøknadsperiodeTekstVariant3,
                                    strong: (children) => <strong>{children}</strong>,
                                    SkrivTilOssLink: () => <SkrivTilOssLink />,
                                }}
                            />
                        </List.Item>
                        <List.Item>
                            <AppText id="omsorgstilbudStep.guide.listItem.3" />
                        </List.Item>
                        <List.Item>
                            <AppText
                                id="omsorgstilbudStep.guide.listItem.4"
                                values={{
                                    link: (text) => <Link href={getLenker().søknadPleiepenger}>{text}</Link>,
                                }}
                            />
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
