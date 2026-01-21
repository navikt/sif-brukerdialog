import { BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
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
        <VStack gap="space-24">
            <div>
                <Heading level="3" size="xsmall" spacing>
                    <BodyShort as="span">Sluttdato:</BodyShort>
                </Heading>
                <BodyShort size="large" weight="semibold" className="text-2xl capitalize">
                    {dateFormatter.dayCompactDate(tilOgMed)}
                </BodyShort>
            </div>

            <div>
                {kanEndreSluttdato ? (
                    <Button
                        variant="secondary"
                        size="small"
                        icon={<PencilFillIcon aria-hidden="true" />}
                        onClick={onClickEndreSluttdato}>
                        Endre sluttdato
                    </Button>
                ) : (
                    <>Sluttdato kan ikke endres</>
                )}
            </div>
        </VStack>
    </InfoBox>
);

export default EndreSluttdatoPanel;
