import { AppText, useAppIntl } from '@app/i18n';
import { EndringStepId, StepId } from '@app/søknad/config/StepId';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';

import { OppsummeringEndringer } from '../oppsummeringStepUtils';
import EndreLenke from './EndreLenke';

interface Props {
    endringer: OppsummeringEndringer;
    harIngenEndringer: boolean;
    onEndre: (stepId: EndringStepId) => void;
}

const FlereEndringer = ({ endringer, harIngenEndringer, onEndre }: Props) => {
    const { text } = useAppIntl();
    // Hvis alle endringer er gjort, vis ikke komponenten
    if (endringer.ferie && endringer.arbeidstid && endringer.tilsynsordning) {
        return null;
    }
    return (
        <VStack gap="space-12" marginBlock="space-24 space-12">
            <VStack gap="space-4">
                <Heading level="2" size="small">
                    <AppText
                        id={harIngenEndringer ? 'flereEndringer.ingenEndringer.tittel' : 'flereEndringer.tittel'}
                    />
                </Heading>
                {!harIngenEndringer && (
                    <BodyLong className="noPadding">
                        <AppText id="flereEndringer.tekst" />
                    </BodyLong>
                )}
            </VStack>

            {!endringer.ferie && (
                <EndreLenke
                    label={text('flereEndringer.endreFerie')}
                    onClick={() => onEndre(StepId.LOVBESTEMT_FERIE)}
                />
            )}
            {!endringer.arbeidstid && (
                <EndreLenke label={text('flereEndringer.endreArbeidstid')} onClick={() => onEndre(StepId.ARBEIDSTID)} />
            )}
            {!endringer.tilsynsordning && (
                <EndreLenke
                    label={text('flereEndringer.endreTilsynsordning')}
                    onClick={() => onEndre(StepId.TILSYNSORDNING)}
                />
            )}
        </VStack>
    );
};

export default FlereEndringer;
