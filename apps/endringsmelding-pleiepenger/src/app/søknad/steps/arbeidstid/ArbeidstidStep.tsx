import ArbeidsaktiviteterMedUkjentArbeidsgiver from '@app/components/arbeidsaktiviteter-med-ukjent-arbeidsgiver/ArbeidsaktiviteterMedUkjentArbeidsgiver';
import { useSøknadContext } from '@app/hooks';
import { useSøknadsdataInfo } from '@app/hooks/useSøknadsdataInfo';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText, useAppIntl } from '@app/i18n';
import { StepId } from '@app/søknad/config/StepId';
import SøknadStep from '@app/søknad/SøknadStep';
import { Alert, Heading, List, ReadMore, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import ArbeidstidForm from './ArbeidstidForm';

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;
    const { text } = useAppIntl();

    const {
        state: {
            sak: { arbeidsaktivitetMedUkjentArbeidsgiver, arbeidsaktiviteter },
        },
    } = useSøknadContext();

    const { goBack, includeBackLink, stepConfig } = useStepConfig(stepId);

    const { harFjernetFerie } = useSøknadsdataInfo();

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig} includeBackLink={includeBackLink}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="arbeidstidStep.title" />
                </Heading>
                <VStack gap="space-24">
                    <List>
                        <List.Item>
                            <AppText id="arbeidstidStep.info.1" />
                        </List.Item>
                        <List.Item>
                            <AppText id="arbeidstidStep.info.2" />
                        </List.Item>
                    </List>
                    <ReadMore header={text('arbeidstidStep.endring.tittel')}>
                        <AppText id="arbeidstidStep.endring.tekst" />
                    </ReadMore>
                </VStack>
            </FormLayout.Guide>
            <VStack gap="space-32">
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
