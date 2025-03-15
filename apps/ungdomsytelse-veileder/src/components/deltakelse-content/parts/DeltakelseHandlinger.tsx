import { Button } from '@navikt/ds-react';
import { Deltakelse, Deltaker, Oppgavetype } from '@navikt/ung-common';
import { useState } from 'react';
import EndreStartdatoModal from '../../endre-startdato-modal/EndreStartdatoModal';
import SectionContainer from '../../section-container/SectionContainer';
import EndreSluttdatoModal from '../../endre-sluttdato-modal/EndreSluttdatoModal';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelseHandlinger = ({ deltakelse, deltaker }: Props) => {
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
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                />
            ) : null}

            {visOppgaveDialog === Oppgavetype.BEKREFT_ENDRET_SLUTTDATO ? (
                <EndreSluttdatoModal
                    deltaker={deltaker}
                    deltakelse={deltakelse}
                    onClose={() => setVisOppgaveDialog(null)}
                />
            ) : null}
        </>
    );
};

export default DeltakelseHandlinger;
