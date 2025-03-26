import { Button } from '@navikt/ds-react';
import { Deltakelse, Deltaker, Oppgavetype } from '@navikt/ung-common';
import { useState } from 'react';
import EndreStartdatoModal from '../../endre-startdato-modal/EndreStartdatoModal';
import SectionContainer from '../../section-container/SectionContainer';
import EndreSluttdatoModal from '../../endre-sluttdato-modal/EndreSluttdatoModal';
import { Veileder } from '../../../types/Veileder';

interface Props {
    veileder: Veileder;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onDeltakelseChanged: () => void;
}

const DeltakelseHandlinger = ({ veileder, deltakelse, deltaker, onDeltakelseChanged }: Props) => {
    const [visOppgaveDialog, setVisOppgaveDialog] = useState<Oppgavetype | null>(null);

    return (
        <>
            <SectionContainer header="Handlinger">
                <Button variant="secondary" onClick={() => setVisOppgaveDialog(Oppgavetype.BEKREFT_ENDRET_STARTDATO)}>
                    Endre startdato
                </Button>
                <Button variant="secondary" onClick={() => setVisOppgaveDialog(Oppgavetype.BEKREFT_ENDRET_SLUTTDATO)}>
                    Endre sluttdato
                </Button>
            </SectionContainer>

            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_STARTDATO ? (
                <EndreStartdatoModal
                    veileder={veileder}
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                    onChanged={onDeltakelseChanged}
                />
            ) : null}

            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO ? (
                <EndreSluttdatoModal
                    veileder={veileder}
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                    onChanged={onDeltakelseChanged}
                />
            ) : null}
        </>
    );
};

export default DeltakelseHandlinger;
