import { Alert, Bleed, Box, Button, Heading, Tag, VStack } from '@navikt/ds-react';
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
                    <>
                        {visSkjema ? (
                            <Box className="mt-4">
                                <Bleed marginInline="5">
                                    <VStack gap="4" className="rounded-md bg-white p-8 shadow-small">
                                        <Heading size="medium" level="2">
                                            Svarskjema
                                        </Heading>
                                        {children}
                                    </VStack>
                                </Bleed>
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setVisSkjema(true);
                                        if (onÅpneOppgave) {
                                            onÅpneOppgave();
                                        }
                                    }}>
                                    {visOppgaveTittel}
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </VStack>
        </BlueBox>
    );
};

export default OppgaveLayout;
