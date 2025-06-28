import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { getDateToday } from '@navikt/sif-common-utils';
import { useState } from 'react';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';
import { getTillattEndringsperiode, kanEndreSluttdato, kanEndreStartdato } from '../../../utils/deltakelseUtils';
import DatoBoks from './DatoBoks';
import { Deltaker } from '../../../types/Deltaker';
import { Deltakelse } from '../../../types/Deltakelse';

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

    const handleOnDeltakelseChanged = (d: Deltakelse) => {
        setEndretDeltakelse(d);
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
                        tittel="Startdato:"
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
                        tittel="Sluttdato:"
                        dato={deltakelse.tilOgMed}
                        endre={
                            kanEndreSluttdato(deltakelse, tillattEndringsperiode)
                                ? {
                                      label: deltakelse.tilOgMed ? 'Endre sluttdato' : 'Registrer sluttdato',
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

export default DeltakelsePeriodeInfo;
