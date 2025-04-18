import { Button } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useState } from 'react';
import SectionContainer from '../../section-container/SectionContainer';
import EndreDeltakelseModal from '../../endre-deltakelse-modal/EndreDeltakelseModal';
import EndreStartdatoForm from '../../../forms/endre-startdato-form/EndreStartdatoForm';
import EndreSluttdatoForm from '../../../forms/endre-sluttdato-form/EndreSluttdatoForm';
import { useDeltakelserForDeltaker } from '../../../hooks/useDeltakelserForDeltaker';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    // onDeltakelseChanged: () => void;
}

enum EndrePeriodeDialogType {
    'startdato' = 'startdato',
    'sluttdato' = 'sluttdato',
}

const DeltakelseHandlinger = ({ deltakelse, deltaker }: Props) => {
    const [visOppgaveDialog, setVisOppgaveDialog] = useState<EndrePeriodeDialogType | undefined>(undefined);
    const [endretDeltakelse, setEndretDeltakelse] = useState<Deltakelse | null>();

    const { refetch } = useDeltakelserForDeltaker(deltaker.id);

    const handleOnClose = () => {
        setVisOppgaveDialog(undefined);
        setEndretDeltakelse(undefined);
    };

    const handleOnDeltakelseChanged = (deltakelse: Deltakelse) => {
        setEndretDeltakelse(deltakelse);
        refetch();
    };
    return (
        <>
            <SectionContainer header="Handlinger">
                <Button
                    variant="primary"
                    onClick={() => {
                        setEndretDeltakelse(undefined);
                        setVisOppgaveDialog(EndrePeriodeDialogType.startdato);
                    }}>
                    Endre startdato
                </Button>
                <Button variant="primary" onClick={() => setVisOppgaveDialog(EndrePeriodeDialogType.sluttdato)}>
                    {deltakelse.tilOgMed ? 'Endre sluttdato' : 'Sett sluttdato'}
                </Button>
            </SectionContainer>

            {visOppgaveDialog === EndrePeriodeDialogType.startdato ? (
                <EndreDeltakelseModal
                    header="Endre startdato"
                    onClose={handleOnClose}
                    deltakelseChanged={endretDeltakelse !== undefined}>
                    <EndreStartdatoForm
                        deltakelse={deltakelse}
                        deltaker={deltaker}
                        onCancel={handleOnClose}
                        onDeltakelseChanged={handleOnDeltakelseChanged}
                    />
                </EndreDeltakelseModal>
            ) : null}

            {visOppgaveDialog === EndrePeriodeDialogType.sluttdato ? (
                <EndreDeltakelseModal
                    header="Endre sluttdato"
                    onClose={handleOnClose}
                    deltakelseChanged={endretDeltakelse !== undefined}>
                    <EndreSluttdatoForm
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
