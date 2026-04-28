import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { PencilFillIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import InfoBox from '../../../atoms/InfoBox';

interface Props {
    tilOgMed: Date;
    kanEndreSluttdato: boolean;
    onClickEndreSluttdato: () => void;
}

const EndreSluttdatoPanel = ({ tilOgMed, kanEndreSluttdato, onClickEndreSluttdato }: Props) => (
    <InfoBox>
        <VStack gap="space-12">
            <div>
                <Heading level="3" size="xsmall" spacing>
                    Sluttdato
                </Heading>
                <BodyShort size="large" weight="semibold" className="capitalize" style={{ fontSize: '1.5rem' }}>
                    {dateFormatter.dayCompactDate(tilOgMed)}
                </BodyShort>
            </div>

            <div>
                {kanEndreSluttdato ? (
                    <Box paddingBlock="space-8 space-0">
                        <Button
                            variant="primary"
                            size="small"
                            icon={<PencilFillIcon aria-hidden="true" />}
                            onClick={onClickEndreSluttdato}>
                            Endre sluttdato
                        </Button>
                    </Box>
                ) : (
                    <>Sluttdato kan ikke endres</>
                )}
            </div>
        </VStack>
    </InfoBox>
);

export default EndreSluttdatoPanel;
