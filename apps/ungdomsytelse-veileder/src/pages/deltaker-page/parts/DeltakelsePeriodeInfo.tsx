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
            <VStack gap="3">
                <Heading level="2" size="medium">
                    Deltakerperiode
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <DatoBoks
                        tittel="Startdato"
                        dato={deltakelse.fraOgMed}
                        endre={
                            kanEndreStartdato(deltakelse, tillattEndringsperiode)
                                ? {
                                      label: 'Endre startdato',
                                      onClick: () => {
                                          setEndretDeltakelse(undefined);
                                          setFormVariant(EndrePeriodeVariant.startdato);
                                      },
                                  }
                                : undefined
                        }
                        kanIkkeEndreTekst="Startdato kan ikke endres"
                    />

                    <DatoBoks
                        tittel="Sluttdato"
                        dato={deltakelse.tilOgMed}
                        endre={
                            kanEndreSluttdato(deltakelse, tillattEndringsperiode)
                                ? {
                                      label: 'Endre sluttdato',
                                      onClick: () => {
                                          setEndretDeltakelse(undefined);
                                          setFormVariant(EndrePeriodeVariant.sluttdato);
                                      },
                                  }
                                : undefined
                        }
                        kanIkkeEndreTekst="Sluttdato kan ikke endres"
                    />
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
        <VStack className="bg-gray-50 p-5 rounded-md" gap="1">
            <Heading level="3" size="xsmall">
                <BodyShort as="span">{tittel}</BodyShort>
            </Heading>
            <BodyShort size="large" weight="semibold" className="text-2xl capitalize" spacing>
                {dato ? dateFormatter.dayCompactDate(dato) : '-'}
            </BodyShort>
            {endre ? (
                <Box>
                    <Button variant="primary" size="small" icon={<PencilFillIcon />} onClick={endre.onClick}>
                        {endre.label}
                    </Button>
                </Box>
            ) : (
                <Alert variant="info" inline>
                    {kanIkkeEndreTekst}
                </Alert>
            )}
        </VStack>
    );
};

export default DeltakelsePeriodeInfo;
