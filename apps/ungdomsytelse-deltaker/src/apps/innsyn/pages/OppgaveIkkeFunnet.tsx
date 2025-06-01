import { BodyShort, Heading, Link, List, VStack } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { useNavigate } from 'react-router-dom';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';
import DefaultPage from '../components/page-layout/DefaultPage';

interface Props {
    oppgaveReferanse?: string;
}

const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    const { deltakelsePeriode } = useDeltakerContext();
    const navigate = useNavigate();

    return (
        <DefaultPage title="Oppgave ikke funnet">
            <VStack gap="8">
                <VStack gap="4">
                    <Heading size="large" level="1">
                        Oppgave ikke funnet
                    </Heading>
                    {oppgaveReferanse ? (
                        <BodyShort>Vi kunne ikke finne oppgave med id {oppgaveReferanse}.</BodyShort>
                    ) : (
                        <BodyShort>Vi kunne ikke finne oppgave - id mangler.</BodyShort>
                    )}
                </VStack>

                {deltakelsePeriode.oppgaver.length > 0 ? (
                    <>
                        <Heading level="2" size="medium">
                            Oppgaver i deltakelse
                        </Heading>
                        <List>
                            {deltakelsePeriode.oppgaver.map((o) => (
                                <ListItem key={o.oppgaveReferanse}>
                                    <Link
                                        href="#"
                                        onClick={(evt) => {
                                            evt.stopPropagation();
                                            evt.preventDefault();
                                            navigate(`../oppgave/${o.oppgaveReferanse}`);
                                        }}>
                                        {o.oppgavetype}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </>
                ) : (
                    <BodyShort>Ingen oppgaver er registrert</BodyShort>
                )}
            </VStack>
        </DefaultPage>
    );
};

export default OppgaveIkkeFunnetPage;
