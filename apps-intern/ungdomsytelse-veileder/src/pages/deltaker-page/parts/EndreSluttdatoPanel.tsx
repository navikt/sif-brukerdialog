import { Bleed, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    tilOgMed: Date;

    kanEndreSluttdato: boolean;
    onClickEndreSluttdato: () => void;
}

const EndreSluttdatoPanel = ({ tilOgMed, kanEndreSluttdato, onClickEndreSluttdato }: Props) => {
    return (
        <Bleed marginBlock="space-1">
            <VStack gap="space-8">
                <BodyShort weight="semibold" size="large" className="capitalize">
                    {dateFormatter.dayCompactDate(tilOgMed)}
                </BodyShort>
                {kanEndreSluttdato ? (
                    <Box paddingBlock="space-8 space-0">
                        <Button variant="secondary" size="small" onClick={onClickEndreSluttdato}>
                            Endre sluttdato
                        </Button>
                    </Box>
                ) : (
                    <>Sluttdato kan ikke endres</>
                )}
            </VStack>
        </Bleed>
    );
};

export default EndreSluttdatoPanel;
