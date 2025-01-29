import { Alert, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    månedNavn: string;
    kanRapportere?: boolean;
    fristForRapportering: Date;
    visSkjema: boolean;
    onRapporterInntekt: () => void;
}

const RapporterInntektPart = ({
    månedNavn,
    kanRapportere,
    fristForRapportering,
    onRapporterInntekt,
    visSkjema,
}: Props) => {
    return (
        <VStack gap="6">
            <BodyShort>
                Hvis du har inntekt i {månedNavn}, må du oppgi denne innen utgangen av{' '}
                <strong>{dateFormatter.dayDateMonth(fristForRapportering)}</strong>. Hvis du ikke har noe inntekt denne
                måneden, trenger du ikke melde fra.
            </BodyShort>
            {kanRapportere ? (
                <>
                    {visSkjema !== true ? (
                        <Box>
                            <Button variant="primary" type="button" onClick={onRapporterInntekt}>
                                Meld inn inntekt for {månedNavn}
                            </Button>
                        </Box>
                    ) : null}
                </>
            ) : (
                <Alert variant="info" inline={true}>
                    Du kan ikke melde inn inntekt for denne perioden nå.
                </Alert>
            )}
        </VStack>
    );
};

export default RapporterInntektPart;
