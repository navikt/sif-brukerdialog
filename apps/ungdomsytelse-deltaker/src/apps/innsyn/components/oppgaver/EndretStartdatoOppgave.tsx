import { BodyShort, Button, ConfirmationPanel, Heading, HStack, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { BekreftEndretStartdatoOppgave } from '@navikt/ung-common';
import BlueBox from '../../../../components/blue-box/BlueBox';

interface Props {
    oppgave: BekreftEndretStartdatoOppgave;
}

const EndretStartdatoOppgave = ({ oppgave }: Props) => {
    return (
        <BlueBox>
            <Heading level="2" size="medium" spacing={true}>
                Ny oppgave: Bekreft endret startdato
            </Heading>
            <VStack gap="4">
                <BodyShort>
                    Veileder har endret din startdato for ungdomsprogrammet til{' '}
                    <strong>{dateFormatter.compact(oppgave.startdato)}</strong>. Du må bekrefte at din periode i
                    programmet nå skal gjelde fra og med denne datoen.
                </BodyShort>
                <VStack gap="1">
                    <ReadMore header="Hvilke konsekvenser får det at datoen nå er senere enn opprinnelig dato?">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odio repellendus
                        consequuntur quisquam! Quia, ipsum consectetur placeat numquam id quibusdam eligendi dolor dicta
                        quidem ex aliquam, neque excepturi fugit dolores?
                    </ReadMore>
                    <ReadMore header="Hva skjer hvis jeg ikke bekrefter?">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odio repellendus
                        consequuntur quisquam! Quia, ipsum consectetur placeat numquam id quibusdam eligendi dolor dicta
                        quidem ex aliquam, neque excepturi fugit dolores?
                    </ReadMore>
                </VStack>
                <ConfirmationPanel name="bekreftEndretStartdato" label="Jeg bekrefter at ny dato er riktig." />
                <HStack gap="4">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            alert('TODO');
                        }}>
                        Send bekreftelse
                    </Button>
                </HStack>
            </VStack>
        </BlueBox>
    );
};

export default EndretStartdatoOppgave;
