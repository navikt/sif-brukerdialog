import { Alert, BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import InfoBox from '../../../atoms/InfoBox';
import { PencilFillIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';

interface DatoBoksProps {
    tittel: string;
    dato?: Date;
    endre?: {
        label: string;
        onClick: () => void;
    };
    kanIkkeEndreTekst: string;
}

const DatoBoks = ({ tittel, dato, endre, kanIkkeEndreTekst }: DatoBoksProps) => {
    return (
        <InfoBox>
            <VStack gap="1">
                <Heading level="3" size="xsmall">
                    <BodyShort as="span">{tittel}</BodyShort>
                </Heading>
                <BodyShort size="large" weight="semibold" className="text-2xl capitalize" spacing>
                    {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                </BodyShort>
                {endre ? (
                    <Box>
                        <Button
                            variant="primary"
                            size="small"
                            icon={<PencilFillIcon role="presentation" />}
                            onClick={endre.onClick}>
                            {endre.label}
                        </Button>
                    </Box>
                ) : (
                    <Alert variant="info" inline>
                        {kanIkkeEndreTekst}
                    </Alert>
                )}
            </VStack>
        </InfoBox>
    );
};

export default DatoBoks;
