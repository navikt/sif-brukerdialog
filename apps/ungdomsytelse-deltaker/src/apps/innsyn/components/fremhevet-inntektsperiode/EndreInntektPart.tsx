import { Alert, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { Inntekt } from '../../../../api/types';

interface Props {
    månedNavn: string;
    inntekt?: Inntekt;
    kanRapportere?: boolean;
    visSkjema: boolean;
    onEndreInntekt: () => void;
}

const EndreInntektPart = ({ månedNavn, inntekt, kanRapportere, onEndreInntekt, visSkjema }: Props) => {
    return (
        <VStack gap="6">
            <BodyShort>
                For {månedNavn} har du rapportert{' '}
                <strong>
                    <FormattedNumber value={inntekt?.summertInntekt || 0} /> kroner
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
