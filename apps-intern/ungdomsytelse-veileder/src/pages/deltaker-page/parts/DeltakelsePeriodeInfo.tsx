import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getDateToday } from '@navikt/sif-common-utils';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import { Features } from '../../../types/Features';
import { getTillattEndringsperiode, kanEndreSluttdato, kanEndreStartdato } from '../../../utils/deltakelseUtils';
import EndreSluttdatoPanel from './EndreSluttdatoPanel';
import EndreStartdatoPanel from './EndreStartdatoPanel';
import MeldUtDeltakerPanel from './MeldUtDeltakerPanel';
import SluttdatoKanIkkeEndresPanel from './SluttdatoKanIkkeEndresPanel';

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

    const deltakerHarSøkt = deltakelse.søktTidspunkt;

    return (
        <>
            <VStack gap="space-12">
                <Heading level="2" size="medium">
                    Deltakerperiode
                </Heading>
                <HGrid gap="space-16" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <EndreStartdatoPanel
                        dato={deltakelse.fraOgMed}
                        kanEndreStartdato={kanEndreStartdato(deltakelse, tillattEndringsperiode)}
                        onClickEndreButton={() => {
                            setEndretDeltakelse(undefined);
                            setFormVariant(EndrePeriodeVariant.startdato);
                        }}
                    />
                    {Features.endreSluttdato ? (
                        <>
                            {deltakerHarSøkt && deltakelse.tilOgMed && (
                                <EndreSluttdatoPanel
                                    tilOgMed={deltakelse.tilOgMed}
                                    kanEndreSluttdato={kanEndreSluttdato(deltakelse, tillattEndringsperiode)}
                                    onClickEndreSluttdato={() => {
                                        setEndretDeltakelse(undefined);
                                        setFormVariant(EndrePeriodeVariant.endreSluttdato);
                                    }}
                                />
                            )}
                            {deltakerHarSøkt && !deltakelse.tilOgMed && (
                                <MeldUtDeltakerPanel
                                    onClickMeldUtButton={() => {
                                        setEndretDeltakelse(undefined);
                                        setFormVariant(EndrePeriodeVariant.meldUtDeltaker);
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <SluttdatoKanIkkeEndresPanel />
                    )}
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
