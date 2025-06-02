import { Box, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import BlueBox from '../../../../components/blue-box/BlueBox';

interface Props {
    tittel: string;
    svarfrist: Date;
    beskrivelse: React.ReactNode;
    visOppgaveTittel?: string;
    children: React.ReactNode;
}

const PageOppgaveLayout = ({ tittel, svarfrist, beskrivelse, children }: Props) => {
    return (
        <VStack gap="6">
            <Heading level="2" size="medium" spacing={true}>
                {tittel}
            </Heading>
            {beskrivelse}
            {svarfrist ? (
                <Box>
                    <Heading level="3" size="xsmall" spacing={true}>
                        Svarfrist
                    </Heading>
                    Frist for å svare er <strong>{dateFormatter.full(svarfrist)} [TODO]</strong>. Hvis du ikke svarer
                    innen fristen, godkjennes oppgaven automatisk.
                </Box>
            ) : null}
            <BlueBox>{children}</BlueBox>
            {/* {erBesvart ? <Alert variant="success">Besvart</Alert> : <BlueBox>{children}</BlueBox>} */}
        </VStack>
    );
};

export default PageOppgaveLayout;
