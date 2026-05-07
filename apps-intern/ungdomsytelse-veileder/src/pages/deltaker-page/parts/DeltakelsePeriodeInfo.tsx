import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import { getDeltakelseHandlinger } from '../../../utils/deltakelseUtils';
import SluttdatoPanel from '../paneler/SluttdatoPanel';
import StartdatoPanel from '../paneler/StartdatoPanel';
import TildeltKvotePanel from '../paneler/TildeltKvotePanel';
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
                            <StartdatoPanel
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
                            <SluttdatoPanel
                                deltakelse={deltakelse}
                                handlinger={handlinger}
                                onClickEndreSluttdato={() => {
                                    setEndretDeltakelse(undefined);
                                    setFormVariant(EndrePeriodeVariant.endreSluttdato);
                                }}
                                onClickMeldUt={() => {
                                    setEndretDeltakelse(undefined);
                                    setFormVariant(EndrePeriodeVariant.meldUtDeltaker);
                                }}
                            />
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
