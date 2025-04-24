import { Button, HStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useState } from 'react';
import SectionContainer from '../../../components/section-container/SectionContainer';
import EndrePeriodeModal from '../../../components/endre-periode-modal/EndrePeriodeModal';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import ToDo from '../../../dev-components/ToDo';
import { ToDoKeys } from '../../../dev-components/ToDos';
import { kanEndreSluttdato } from '../../../utils/deltakelseUtils';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelseHandlinger = ({ deltakelse, deltaker }: Props) => {
    const [formVariant, setFormVariant] = useState<EndrePeriodeVariant | undefined>(undefined);
    const [endretDeltakelse, setEndretDeltakelse] = useState<Deltakelse | null>();

    const handleOnClose = () => {
        setFormVariant(undefined);
        setEndretDeltakelse(undefined);
    };

    const handleOnDeltakelseChanged = (deltakelse: Deltakelse) => {
        setEndretDeltakelse(deltakelse);
    };
    return (
        <>
            <SectionContainer header="Handlinger">
                <HStack gap="4">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setEndretDeltakelse(undefined);
                            setFormVariant(EndrePeriodeVariant.startdato);
                        }}>
                        Endre startdato
                    </Button>
                    {kanEndreSluttdato(deltakelse) && (
                        <Button variant="primary" onClick={() => setFormVariant(EndrePeriodeVariant.sluttdato)}>
                            {deltakelse.tilOgMed ? 'Endre sluttdato' : 'Registrer sluttdato'}
                        </Button>
                    )}
                </HStack>
                <ToDo id={ToDoKeys.handlinger} />
            </SectionContainer>

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

export default DeltakelseHandlinger;
