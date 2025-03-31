import { Alert, Bleed, Box, ExpansionCard, Heading, Tag, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import BlueBox from '../../../../components/blue-box/BlueBox';
import { useOppgaveContext } from '../oppgave/OppgaveContext';

interface Props {
    tag: React.ReactNode;
    tittel: string;
    svarfrist: Date;
    beskrivelse: React.ReactNode;
    visOppgaveTittel?: string;
    children: React.ReactNode;
    onÅpneOppgave?: () => void;
    visTag?: boolean;
}

const OppgaveLayout = ({
    tag,
    tittel,
    svarfrist,
    beskrivelse,
    children,
    visOppgaveTittel = 'Vis svarskjema',
    visTag,
    onÅpneOppgave,
}: Props) => {
    const { erBesvart, visSkjema, setVisSkjema } = useOppgaveContext();
    return (
        <BlueBox>
            <VStack gap="6">
                {visTag ? (
                    <Box>
                        <Bleed marginBlock="2 0">
                            <Tag variant="alt1-filled">{tag}</Tag>
                        </Bleed>
                    </Box>
                ) : null}
                <Heading level="2" size="medium" spacing={true}>
                    {tittel}
                </Heading>
            </VStack>
            <VStack gap="6" className="pb-6">
                {beskrivelse}
                {svarfrist ? (
                    <Box>
                        <Heading level="3" size="xsmall" spacing={true}>
                            Svarfrist
                        </Heading>
                        Frist for å svare er <strong>{dateFormatter.full(svarfrist)}</strong>. Hvis du ikke svarer innen
                        fristen, godkjennes oppgaven automatisk.
                    </Box>
                ) : null}
                {erBesvart ? (
                    <Alert variant="success">Besvart</Alert>
                ) : (
                    <ExpansionCard
                        size="small"
                        aria-label="Small-variant"
                        open={visSkjema}
                        onToggle={(isOpen) => {
                            setVisSkjema(isOpen);
                            if (isOpen && onÅpneOppgave) {
                                onÅpneOppgave();
                            }
                        }}>
                        <ExpansionCard.Header>
                            <ExpansionCard.Title size="small">{visOppgaveTittel}</ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>{children}</ExpansionCard.Content>
                    </ExpansionCard>
                )}
            </VStack>
        </BlueBox>
    );
};

export default OppgaveLayout;
