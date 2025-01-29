import { BodyShort, Box, Button, ReadMore, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';

interface Props {
    månedNavn: string;
    rapportertInntekt: number;
    kanRapportere?: boolean;
    onEndreInntekt: () => void;
}

const EndreInntektPart = ({ månedNavn, rapportertInntekt, kanRapportere, onEndreInntekt }: Props) => {
    return (
        <VStack gap="6">
            <BodyShort>
                For {månedNavn} har du rapportert{' '}
                <strong>
                    <FormattedNumber value={rapportertInntekt} /> kroner
                </strong>{' '}
                i inntekt.
            </BodyShort>
            {kanRapportere ? (
                <VStack gap="2">
                    <ReadMore header="Mer om inntekt, hva skal jeg ta med">Kort info</ReadMore>
                    <Box>
                        <Button variant="primary" type="button" onClick={onEndreInntekt}>
                            Endre inntekt for {månedNavn}
                        </Button>
                    </Box>
                </VStack>
            ) : null}
        </VStack>
    );
};

export default EndreInntektPart;
