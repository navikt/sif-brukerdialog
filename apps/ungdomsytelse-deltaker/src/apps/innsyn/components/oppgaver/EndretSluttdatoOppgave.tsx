import { BodyShort, Button, ConfirmationPanel, Heading, HStack, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveEndretSluttdato } from '@navikt/ung-common';
import BlueBox from '../../../../components/blue-box/BlueBox';

interface Props {
    oppgave: OppgaveEndretSluttdato;
}

const EndretSluttdatoOppgave = ({ oppgave }: Props) => {
    return (
        <BlueBox>
            <Heading level="2" size="medium" spacing={true}>
                Oppgave: Bekreft endret sluttdato
            </Heading>
            <VStack gap="4">
                <BodyShort>
                    Veileder har endret datoen for når du skal ut av ungdomsprogrammet til{' '}
                    <strong>
                        {oppgave.oppgavetypeData.nySluttdato
                            ? dateFormatter.dayDateMonthYear(oppgave.oppgavetypeData.nySluttdato)
                            : 'TODO'}
                    </strong>
                    . Du må bekrefte at denne datoen er riktig.
                </BodyShort>
                <ConfirmationPanel name="bekreftEndretStartdato" label="Jeg bekrefter at ny dato er riktig." />
                <HStack gap="8">
                    <Button variant="primary">Send</Button>
                    <Button variant="secondary">Jeg godkjenner ikke</Button>
                </HStack>
            </VStack>
        </BlueBox>
    );
};

export default EndretSluttdatoOppgave;
