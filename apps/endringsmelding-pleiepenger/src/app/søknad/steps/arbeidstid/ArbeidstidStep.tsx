import { Alert, Heading, List, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import ArbeidsaktiviteterMedUkjentArbeidsgiver from '../../../components/arbeidsaktiviteter-med-ukjent-arbeidsgiver/ArbeidsaktiviteterMedUkjentArbeidsgiver';
import { useSøknadContext } from '../../../hooks';
import { useSøknadsdataInfo } from '../../../hooks/useSøknadsdataInfo';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { AppText } from '../../../i18n';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import ArbeidstidForm from './ArbeidstidForm';

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;

    const {
        state: {
            sak: { arbeidsaktivitetMedUkjentArbeidsgiver, arbeidsaktiviteter },
        },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);

    const { harFjernetFerie } = useSøknadsdataInfo();

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="arbeidstidStep.title" />
                </Heading>
                <List>
                    <List.Item>
                        <AppText id="arbeidstidStep.info.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="arbeidstidStep.info.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="arbeidstidStep.info.3" />
                    </List.Item>
                </List>
            </FormLayout.Guide>

            <VStack gap="8">
                {harFjernetFerie && (
                    <Alert variant="warning">
                        <AppText id="arbeidstidStep.fjernetFerie.melding" />
                    </Alert>
                )}

                {arbeidsaktivitetMedUkjentArbeidsgiver.length === 0 ? null : (
                    <ArbeidsaktiviteterMedUkjentArbeidsgiver
                        arbeidsaktivitetMedUkjentArbeidsgiver={arbeidsaktivitetMedUkjentArbeidsgiver}
                        arbeidsaktiviteter={arbeidsaktiviteter}
                    />
                )}

                <ArbeidstidForm goBack={goBack} />
            </VStack>
        </SøknadStep>
    );
};

export default ArbeidstidStep;
