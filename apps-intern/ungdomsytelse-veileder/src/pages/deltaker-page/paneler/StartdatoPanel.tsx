import { Alert, Bleed, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface DatoBoksProps {
    dato: Date;

    kanEndreStartdato: boolean;
    onClickEndreButton: () => void;
}

const StartdatoPanel = ({ dato, kanEndreStartdato, onClickEndreButton }: DatoBoksProps) => {
    return (
        <Bleed marginBlock="space-1">
            <VStack gap="space-8" maxWidth="40rem">
                <BodyShort weight="semibold" size="large" className="capitalize">
                    {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                </BodyShort>
                {kanEndreStartdato ? (
                    <>
                        <Box paddingBlock="space-8 space-0">
                            <Button variant="secondary" size="small" onClick={onClickEndreButton}>
                                Endre startdato
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Alert variant="info" inline>
                        Startdato kan ikke endres
                    </Alert>
                )}
            </VStack>
        </Bleed>
    );
};

export default StartdatoPanel;
