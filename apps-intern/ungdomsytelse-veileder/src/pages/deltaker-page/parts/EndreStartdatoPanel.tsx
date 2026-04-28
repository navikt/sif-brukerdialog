import { Alert, BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { PencilFillIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import InfoBox from '../../../atoms/InfoBox';

interface DatoBoksProps {
    dato: Date;
    kanEndreStartdato: boolean;
    onClickEndreButton: () => void;
}

const EndreStartdatoPanel = ({ dato, kanEndreStartdato, onClickEndreButton }: DatoBoksProps) => {
    return (
        <InfoBox>
            <VStack gap="space-12">
                <div>
                    <Heading level="3" size="xsmall" spacing>
                        Startdato
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="capitalize" style={{ fontSize: '1.5rem' }}>
                        {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                    </BodyShort>
                </div>
                {kanEndreStartdato ? (
                    <Box paddingBlock="space-8 space-0">
                        <Button
                            variant="primary"
                            size="small"
                            icon={<PencilFillIcon aria-hidden="true" />}
                            onClick={onClickEndreButton}>
                            Endre startdato
                        </Button>
                    </Box>
                ) : (
                    <Alert variant="info" inline>
                        Startdato kan ikke endres
                    </Alert>
                )}
            </VStack>
        </InfoBox>
    );
};

export default EndreStartdatoPanel;
