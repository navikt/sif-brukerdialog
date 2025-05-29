import { ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import OppgaveUttalelse from '../oppgaver/parts/OppgaveUttalelse';
import { BekreftelseDto } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';

interface Props {
    oppgavetittel: string;
    deltakerNavn: string;
    bekreftelse?: BekreftelseDto;
    children: React.ReactNode;
}

const LøstOppgavebekreftelse = ({ oppgavetittel, deltakerNavn, bekreftelse, children }: Props) => {
    return (
        <VStack gap="6">
            <Heading level="1" size="large">
                {oppgavetittel}
            </Heading>
            <ExpansionCard aria-label="Beskjed fra Nav" size="small">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Oppgaveinformasjon</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="4">
                        <Heading level="3" size="small">
                            Hei {deltakerNavn}
                        </Heading>
                        <div>{children}</div>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>

            {bekreftelse ? (
                <OppgaveUttalelse
                    godtarSpørsmål="Forstår og godtar du at startdatoen din er endret"
                    bekreftelse={bekreftelse}
                />
            ) : (
                <>Informasjon om bekreftelse mangler</>
            )}

            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default LøstOppgavebekreftelse;
