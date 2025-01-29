import { Alert, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';

interface Props {
    månedNavn: string;
    rapportertInntekt: number;
    kanRapportere?: boolean;
    visSkjema: boolean;
    onEndreInntekt: () => void;
}

const EndreInntektPart = ({ månedNavn, rapportertInntekt, kanRapportere, onEndreInntekt, visSkjema }: Props) => {
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
                <>
                    {visSkjema !== true ? (
                        <Box>
                            <Button variant="primary" type="button" onClick={onEndreInntekt}>
                                Endre inntekt for {månedNavn}
                            </Button>
                        </Box>
                    ) : null}
                </>
            ) : (
                <Alert variant="info" inline={true}>
                    Du kan ikke endre inntekt for denne perioden nå.
                </Alert>
            )}
        </VStack>
    );
};

export default EndreInntektPart;
