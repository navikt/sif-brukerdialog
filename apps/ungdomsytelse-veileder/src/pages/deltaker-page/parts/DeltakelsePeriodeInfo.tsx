import { Alert, BodyShort, Box, Button, Heading, HGrid, VStack } from '@navikt/ds-react';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useState } from 'react';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';
import { getTillattEndringsperiode, kanEndreSluttdato, kanEndreStartdato } from '../../../utils/deltakelseUtils';
import { PencilFillIcon } from '@navikt/aksel-icons';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelsePeriodeInfo = ({ deltakelse, deltaker }: Props) => {
    const [formVariant, setFormVariant] = useState<EndrePeriodeVariant | undefined>(undefined);
    const [endretDeltakelse, setEndretDeltakelse] = useState<Deltakelse | null>();

    const handleOnClose = () => {
        setFormVariant(undefined);
        setEndretDeltakelse(undefined);
    };

    const handleOnDeltakelseChanged = (deltakelse: Deltakelse) => {
        setEndretDeltakelse(deltakelse);
    };

    const tillattEndringsperiode = getTillattEndringsperiode(getDateToday());

    return (
        <>
            <VStack gap="2">
                <Heading level="2" size="medium">
                    Deltakerperiode
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <VStack className="bg-gray-50 p-5 rounded-md" gap="1">
                        <Heading level="3" size="xsmall">
                            <BodyShort as="span">Startdato</BodyShort>
                        </Heading>
                        <BodyShort size="large" weight="semibold" className="text-2xl" spacing>
                            {dateFormatter.compact(deltakelse.fraOgMed)}
                        </BodyShort>
                        {kanEndreStartdato(deltakelse, tillattEndringsperiode) ? (
                            <Box>
                                <Button
                                    variant="primary"
                                    size="small"
                                    icon={<PencilFillIcon />}
                                    onClick={() => {
                                        setEndretDeltakelse(undefined);
                                        setFormVariant(EndrePeriodeVariant.startdato);
                                    }}>
                                    Endre startdato
                                </Button>
                            </Box>
                        ) : (
                            <Alert variant="info" size="small" inline>
                                Startdato kan ikke endres
                            </Alert>
                        )}
                    </VStack>
                    <VStack className="bg-gray-50 p-5 rounded-md" gap="1">
                        <Heading level="3" size="xsmall">
                            <BodyShort as="span">Sluttdato</BodyShort>
                        </Heading>
                        <BodyShort size="large" weight="semibold" className="text-2xl" spacing>
                            {deltakelse.tilOgMed ? dateFormatter.compact(deltakelse.tilOgMed) : '-'}
                        </BodyShort>
                        {kanEndreSluttdato(deltakelse, tillattEndringsperiode) ? (
                            <Box>
                                <Button
                                    variant="primary"
                                    size="small"
                                    icon={<PencilFillIcon />}
                                    onClick={() => setFormVariant(EndrePeriodeVariant.sluttdato)}>
                                    {deltakelse.tilOgMed ? 'Endre sluttdato' : 'Registrer sluttdato'}
                                </Button>
                            </Box>
                        ) : (
                            <Alert variant="info" size="small" inline>
                                Sluttdato kan ikke endres
                            </Alert>
                        )}
                    </VStack>
                </HGrid>
            </VStack>
            {formVariant ? (
                <EndrePeriodeModal
                    onClose={handleOnClose}
                    variant={formVariant}
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onDeltakelseChanged={handleOnDeltakelseChanged}
                    deltakelseChanged={endretDeltakelse !== undefined}
                />
            ) : null}
        </>
    );
};

export default DeltakelsePeriodeInfo;
