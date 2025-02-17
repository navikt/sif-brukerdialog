import { dateFormatter } from '@navikt/sif-common-utils';
import { Oppgave } from '../../../../api/schemas/oppgaveSchema';
import { BodyShort, Button, ConfirmationPanel, Heading, HStack, VStack } from '@navikt/ds-react';
import BlueBox from '../../../../components/blue-box/BlueBox';
import { OpenDateRange } from '@navikt/sif-common-formik-ds';

interface Props {
    programPeriode: OpenDateRange;
    oppgaver: Oppgave[];
}

const Oppgaver = ({ oppgaver }: Props) => {
    if (oppgaver.length !== 1) {
        return null;
    }

    const oppgave = oppgaver[0];

    if (oppgave.type === 'bekreftEndretStartdato') {
        return (
            <BlueBox>
                <Heading level="2" size="medium" spacing={true}>
                    Ny oppgave: Bekreft endret startdato
                </Heading>
                <VStack gap="4">
                    <BodyShort>
                        Veileder har endret din startdato for ungdomsprogrammet til{' '}
                        <strong>{dateFormatter.compact(oppgave.startdato)}</strong>. Du må bekrefte at denne datoen er
                        riktig.
                    </BodyShort>
                    <ConfirmationPanel name="bekreftEndretStartdato" label="Jeg bekrefter at ny dato er riktig." />
                    <HStack gap="8">
                        <Button variant="primary">Send</Button>
                        <Button variant="secondary">Jeg godkjenner ikke</Button>
                    </HStack>
                </VStack>
            </BlueBox>
        );
    }
    return null;
};

export default Oppgaver;
