import { Alert, Bleed, Box, ExpansionCard, Heading, HStack, Tag, VStack } from '@navikt/ds-react';
import { ClipboardCheckmarkIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import BlueBox from '../../../../components/blue-box/BlueBox';

interface Props {
    tittel: string;
    svarfrist?: Date;
    beskrivelse: React.ReactNode;
    children: React.ReactNode;
    onÅpneOppgave?: () => void;
}

const OppgaveLayout = ({ tittel, svarfrist, beskrivelse, children, onÅpneOppgave }: Props) => {
    return (
        <BlueBox>
            <VStack gap="6">
                <Box>
                    <Bleed marginBlock="2 0">
                        <Tag variant="alt1-filled" size="small">
                            Varsel om endring
                        </Tag>
                    </Bleed>
                </Box>
                <Heading level="2" size="medium" spacing={true}>
                    {tittel}
                </Heading>
            </VStack>
            <VStack gap="6" className="pb-6">
                {beskrivelse}
                {svarfrist ? (
                    <Alert variant="info" inline>
                        <Box>
                            Frist for å svare er <strong>{dateFormatter.full(svarfrist)}</strong>.
                        </Box>
                        Hvis du ikke svarer innen fristen, godkjennes oppgaven automatisk.
                    </Alert>
                ) : null}
                <ExpansionCard aria-label="Demo med bare tittel" size="small" onChange={onÅpneOppgave}>
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">
                            <HStack gap="2" align={'center'}>
                                <ClipboardCheckmarkIcon />
                                Bekreft eller kommenter endring
                            </HStack>
                        </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>{children}</ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
        </BlueBox>
    );
};

export default OppgaveLayout;
