import { Button } from '@navikt/ds-react';
import { Deltakelse, Deltaker, Oppgavetype } from '@navikt/ung-common';
import { useState } from 'react';
import SectionContainer from '../../section-container/SectionContainer';
import EndreDeltakelseModal from '../../endre-deltakelse-modal/EndreDeltakelseModal';
import EndreStartdatoForm from '../../../forms/endre-startdato-form/EndreStartdatoForm';
import EndreSluttdatoForm from '../../../forms/endre-sluttdato-form/EndreSluttdatoForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onDeltakelseChanged: () => void;
}

const DeltakelseHandlinger = ({ deltakelse, deltaker, onDeltakelseChanged }: Props) => {
    const [visOppgaveDialog, setVisOppgaveDialog] = useState<Oppgavetype | undefined>(undefined);
    const [endretDeltakelse, setEndretDeltakelse] = useState<Deltakelse | null>();

    const handleOnClose = () => {
        setVisOppgaveDialog(undefined);
        setEndretDeltakelse(undefined);
    };
    return (
        <>
            <SectionContainer header="Handlinger">
                <Button
                    variant="secondary"
                    onClick={() => {
                        setEndretDeltakelse(undefined);
                        setVisOppgaveDialog(Oppgavetype.BEKREFT_ENDRET_STARTDATO);
                    }}>
                    Endre startdato
                </Button>
                <Button variant="secondary" onClick={() => setVisOppgaveDialog(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO)}>
                    Endre sluttdato
                </Button>
            </SectionContainer>

            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_STARTDATO ? (
                <EndreDeltakelseModal
                    header="Endre startdato"
                    onClose={handleOnClose}
                    deltakelseChanged={endretDeltakelse !== undefined}>
                    <EndreStartdatoForm
                        deltakelse={deltakelse}
                        deltaker={deltaker}
                        onCancel={handleOnClose}
                        onDeltakelseChanged={(deltakelse) => {
                            setEndretDeltakelse(deltakelse);
                            onDeltakelseChanged();
                        }}
                    />
                </EndreDeltakelseModal>
            ) : null}

            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO ? (
                <EndreDeltakelseModal
                    header="Endre sluttdato"
                    onClose={handleOnClose}
                    deltakelseChanged={endretDeltakelse !== undefined}>
                    <EndreSluttdatoForm
                        deltakelse={deltakelse}
                        deltaker={deltaker}
                        onCancel={handleOnClose}
                        onDeltakelseChanged={(deltakelse) => setEndretDeltakelse(deltakelse)}
                    />
                </EndreDeltakelseModal>
            ) : null}
        </>
    );
};

export default DeltakelseHandlinger;
