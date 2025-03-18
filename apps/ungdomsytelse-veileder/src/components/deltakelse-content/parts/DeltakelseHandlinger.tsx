import { Button } from '@navikt/ds-react';
import { Deltakelse, Deltaker, Oppgavetype } from '@navikt/ung-common';
import { useState } from 'react';
import EndreStartdatoModal from '../../endre-startdato-modal/EndreStartdatoModal';
import SectionContainer from '../../section-container/SectionContainer';
import EndreSluttdatoModal from '../../endre-sluttdato-modal/EndreSluttdatoModal';
import { useDeltaker } from '../../../context/DeltakerContext';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelseHandlinger = ({ deltakelse, deltaker }: Props) => {
    const [visOppgaveDialog, setVisOppgaveDialog] = useState<Oppgavetype | null>(null);
    const { refetchDeltakelser } = useDeltaker();

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
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                    onChanged={refetchDeltakelser}
                />
            ) : null}

            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO ? (
                <EndreSluttdatoModal
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                    onChanged={refetchDeltakelser}
                />
            ) : null}
        </>
    );
};

export default DeltakelseHandlinger;
