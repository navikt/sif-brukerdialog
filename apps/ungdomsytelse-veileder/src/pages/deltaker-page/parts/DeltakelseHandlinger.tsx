import { Button, HStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useState } from 'react';
import SectionContainer from '../../../components/section-container/SectionContainer';
import EndreDeltakelseModal from '../../../components/endre-deltakelse-modal/EndreDeltakelseModal';
import EndrePeriodeForm from '../../../forms/endre-periode-form/EndrePeriodeForm';
import { EndrePeriodeVariant } from '../../../types/EndrePeriodeVariant';
import ToDo from '../../../dev-components/ToDo';
import { ToDoKeys } from '../../../dev-components/ToDos';

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
                    <Button variant="primary" onClick={() => setFormVariant(EndrePeriodeVariant.sluttdato)}>
                        {deltakelse.tilOgMed ? 'Endre sluttdato' : 'Registrer sluttdato'}
                    </Button>
                </HStack>
                <ToDo id={ToDoKeys.handlinger} />
            </SectionContainer>

            {formVariant ? (
                <EndreDeltakelseModal
                    header={formVariant === EndrePeriodeVariant.startdato ? 'Endre startdato' : 'Endre sluttdato'}
                    onClose={handleOnClose}
                    deltakelseChanged={endretDeltakelse !== undefined}>
                    <EndrePeriodeForm
                        variant={formVariant}
                        deltakelse={deltakelse}
                        deltaker={deltaker}
                        onCancel={handleOnClose}
                        onDeltakelseChanged={handleOnDeltakelseChanged}
                    />
                </EndreDeltakelseModal>
            ) : null}
        </>
    );
};

export default DeltakelseHandlinger;
