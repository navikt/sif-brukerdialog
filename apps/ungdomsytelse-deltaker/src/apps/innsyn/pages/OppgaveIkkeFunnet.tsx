import { BodyShort, Heading, Link, List, VStack } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { useNavigate } from 'react-router-dom';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useDeltakerContext } from '../../../hooks/useDeltakerContext';

interface Props {
    oppgaveReferanse?: string;
}

const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    const { deltakelse } = useDeltakerContext();
    const navigate = useNavigate();

    return (
        <Page title="Oppgave ikke funnet">
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

                {deltakelse.oppgaver.length > 0 ? (
                    <>
                        <Heading level="2" size="medium">
                            Oppgaver i deltakelse
                        </Heading>
                        <List>
                            {deltakelse.oppgaver.map((o) => (
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
        </Page>
    );
};

export default OppgaveIkkeFunnetPage;
