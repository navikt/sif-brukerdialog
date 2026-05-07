import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import { getDeltakelseHandlinger } from '../../../utils/deltakelseUtils';
import EndreSluttdatoPanel from './EndreSluttdatoPanel';
import EndreStartdatoPanel from './EndreStartdatoPanel';
import MeldUtDeltakerPanel from './MeldUtDeltakerPanel';
import SluttdatoKanIkkeEndresPanel from './SluttdatoKanIkkeEndresPanel';
import TildeltKvotePanel from './TildeltKvotePanel';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';
import InfoBox from '../../../atoms/InfoBox';

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

    const handlinger = getDeltakelseHandlinger(deltakelse);

    return (
        <>
            <VStack gap="space-12">
                <Heading level="2" size="medium">
                    Deltakerperiode
                </Heading>

                <InfoBox>
                    <dl className="deltakelseInfoDL">
                        <dt>
                            <BodyShort>Periode:</BodyShort>
                        </dt>
                        <dd>
                            <TildeltKvotePanel
                                deltaker={deltaker}
                                deltakelse={deltakelse}
                                onDeltakelseChanged={handleOnDeltakelseChanged}
                            />
                        </dd>
                        <dt>
                            <BodyShort>Startdato:</BodyShort>
                        </dt>
                        <dd>
                            <EndreStartdatoPanel
                                dato={deltakelse.fraOgMed}
                                kanEndreStartdato={handlinger.kanEndreStartdato}
                                onClickEndreButton={() => {
                                    setEndretDeltakelse(undefined);
                                    setFormVariant(EndrePeriodeVariant.startdato);
                                }}
                            />
                        </dd>
                        <dt className="deltakelseInfoDL__lastDefinition">
                            <BodyShort>Sluttdato:</BodyShort>
                        </dt>
                        <dd className="deltakelseInfoDL__lastDefinition">
                            {handlinger.kanEndreSluttdato && deltakelse.tilOgMed && (
                                <EndreSluttdatoPanel
                                    tilOgMed={deltakelse.tilOgMed}
                                    kanEndreSluttdato={true}
                                    onClickEndreSluttdato={() => {
                                        setEndretDeltakelse(undefined);
                                        setFormVariant(EndrePeriodeVariant.endreSluttdato);
                                    }}
                                />
                            )}
                            {handlinger.kanMeldUt && (
                                <MeldUtDeltakerPanel
                                    onClickMeldUtButton={() => {
                                        setEndretDeltakelse(undefined);
                                        setFormVariant(EndrePeriodeVariant.meldUtDeltaker);
                                    }}
                                />
                            )}
                            {!handlinger.kanEndreSluttdato && !handlinger.kanMeldUt && (
                                <SluttdatoKanIkkeEndresPanel deltakelse={deltakelse} />
                            )}
                        </dd>
                    </dl>
                </InfoBox>
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
