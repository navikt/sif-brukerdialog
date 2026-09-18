import ArbeidsaktiviteterMedUkjentArbeidsgiver from '@app/components/arbeidsaktiviteter-med-ukjent-arbeidsgiver/ArbeidsaktiviteterMedUkjentArbeidsgiver';
import { useSøknadContext } from '@app/hooks';
import { useSøknadsdataInfo } from '@app/hooks/useSøknadsdataInfo';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText } from '@app/i18n';
import { StepId } from '@app/søknad/config/StepId';
import SøknadStep from '@app/søknad/SøknadStep';
import { Alert, Heading, List, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import ArbeidstidForm from './ArbeidstidForm';

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;

    const {
        // dispatch,
        state: {
            valgteEndringer,
            singleStepMode,
            sak: { arbeidsaktivitetMedUkjentArbeidsgiver, arbeidsaktiviteter },
        },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);

    const { harFjernetFerie } = useSøknadsdataInfo();

    // const setEndringsvalg = (valgt: boolean) => {
    //     dispatch({
    //         type: SøknadContextActionKeys.SET_ENDRINGSVALG,
    //         payload: {
    //             endring: EndringType.arbeidstid,
    //             valgt,
    //         },
    //     });
    // };

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig} singleStepMode={singleStepMode}>
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

            <VStack gap="space-32">
                {/* <Box background="info-softA" padding="space-16" borderRadius="8">
                    <RadioGroup
                        name="23"
                        legend="Ønsker du å melde fra om endring i arbeidstiden din?"
                        onChange={(value) => setEndringsvalg(value === 'ja')}>
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                </Box> */}
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

                {valgteEndringer.arbeidstid && <ArbeidstidForm goBack={goBack} />}
            </VStack>
        </SøknadStep>
    );
};

export default ArbeidstidStep;
