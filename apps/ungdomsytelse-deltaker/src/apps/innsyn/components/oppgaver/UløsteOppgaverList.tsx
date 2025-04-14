import { BodyShort, Heading, LinkPanel, VStack } from '@navikt/ds-react';
import { dateFormatter, OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';

interface Props {
    uløsteOppgaver: Oppgave[];
    programPeriode: OpenDateRange;
    deltakelseId: string;
}

const UløsteOppgaverList = ({ uløsteOppgaver }: Props) => {
    const navigate = useNavigate();

    return (
        <VStack gap="4">
            {uløsteOppgaver.map((oppgave, index) => (
                <LinkPanel
                    href="#"
                    key={index}
                    className="w-full"
                    onClick={(evt) => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        navigate(`/oppgave/${oppgave.oppgaveReferanse}`);
                    }}>
                    <Heading level="2" size="medium" spacing={true}>
                        {oppgave.oppgavetype}
                    </Heading>
                    <BodyShort>Opprettet {dateFormatter.compact(oppgave.opprettetDato)}</BodyShort>
                </LinkPanel>
            ))}
        </VStack>
    );
};

export default UløsteOppgaverList;
