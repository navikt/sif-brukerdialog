import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import { PencilFillIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import InfoBox from '../../../atoms/InfoBox';

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
            <VStack gap="6">
                <div>
                    <Heading level="3" size="xsmall" spacing>
                        <BodyShort as="span">{tittel}</BodyShort>
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="text-2xl capitalize">
                        {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                    </BodyShort>
                </div>
                {endre ? (
                    <>
                        <div>
                            <Button
                                variant="primary"
                                size="medium"
                                icon={<PencilFillIcon aria-hidden="true" />}
                                onClick={endre.onClick}>
                                {endre.label}
                            </Button>
                        </div>
                    </>
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
