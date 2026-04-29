import { Heading, HGrid, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { getDateToday } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import { Features } from '../../../types/Features';
import {
    deltakelseKvoteErUtløpt,
    deltakelseSluttdatoErPassert,
    getTillattEndringsperiode,
    kanEndreSluttdato,
    kanEndreStartdato,
} from '../../../utils/deltakelseUtils';
import EndreSluttdatoPanel from './EndreSluttdatoPanel';
import EndreStartdatoPanel from './EndreStartdatoPanel';
import MeldUtDeltakerPanel from './MeldUtDeltakerPanel';
import SluttdatoKanIkkeEndresPanel from './SluttdatoKanIkkeEndresPanel';
import TildeltKvotePanel from './TildeltKvotePanel';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';

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

    const deltakerHarSøkt = deltakelse.søktTidspunkt !== undefined;
    const startdatoKanEndres = kanEndreStartdato(deltakelse, tillattEndringsperiode);
    const sluttdatoKanEndres = kanEndreSluttdato(deltakelse, tillattEndringsperiode);

    return (
        <>
            <VStack gap="space-12">
                <Heading level="2" size="medium">
                    Deltakerperiode
                </Heading>

                <TildeltKvotePanel
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    kanEndreKvote={
                        deltakerHarSøkt &&
                        !deltakelseKvoteErUtløpt(deltakelse) &&
                        !deltakelseSluttdatoErPassert(deltakelse)
                    }
                    onDeltakelseChanged={handleOnDeltakelseChanged}
                />
                <HGrid gap="space-8" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <EndreStartdatoPanel
                        dato={deltakelse.fraOgMed}
                        kanEndreStartdato={startdatoKanEndres}
                        onClickEndreButton={() => {
                            setEndretDeltakelse(undefined);
                            setFormVariant(EndrePeriodeVariant.startdato);
                        }}
                    />
                    {Features.endreSluttdato && sluttdatoKanEndres ? (
                        <>
                            {deltakerHarSøkt && deltakelse.tilOgMed && (
                                <EndreSluttdatoPanel
                                    tilOgMed={deltakelse.tilOgMed}
                                    kanEndreSluttdato={sluttdatoKanEndres}
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
                            {!deltakerHarSøkt && <SluttdatoKanIkkeEndresPanel deltakelse={deltakelse} />}
                        </>
                    ) : (
                        <SluttdatoKanIkkeEndresPanel deltakelse={deltakelse} />
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
