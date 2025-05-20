import { VStack } from '@navikt/ds-react';
import { OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';
import OppgaveLinkPanel from './OppgaveLinkPanel';

interface Props {
    oppgaver: Oppgave[];
    programPeriode: OpenDateRange;
    deltakelseId: string;
}

const OppgaverList = ({ oppgaver }: Props) => {
    const navigate = useNavigate();

    return (
        <VStack gap="4">
            {oppgaver.map((oppgave, index) => (
                <OppgaveLinkPanel
                    key={index}
                    oppgave={oppgave}
                    onGotoOppgave={() => {
                        navigate(`/oppgave/${oppgave.oppgaveReferanse}`);
                    }}
                />
            ))}
        </VStack>
    );
};

export default OppgaverList;
