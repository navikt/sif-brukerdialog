import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
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
            <VStack gap="6">
                <div>
                    <Heading level="3" size="xsmall" spacing>
                        <BodyShort as="span">Startdato:</BodyShort>
                    </Heading>
                    <BodyShort size="large" weight="semibold" className="text-2xl capitalize">
                        {dato ? dateFormatter.dayCompactDate(dato) : '-'}
                    </BodyShort>
                </div>
                {kanEndreStartdato ? (
                    <div>
                        <Button
                            variant="primary"
                            size="medium"
                            icon={<PencilFillIcon aria-hidden="true" />}
                            onClick={onClickEndreButton}>
                            Endre startdato
                        </Button>
                    </div>
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
