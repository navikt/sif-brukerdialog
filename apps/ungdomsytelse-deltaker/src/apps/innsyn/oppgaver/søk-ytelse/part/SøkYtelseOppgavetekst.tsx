import { Alert, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import getLenker from '../../../../../utils/lenker';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '../../../components/oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { SøkYtelseOppgave } from '../../../../../types/Oppgave';

interface Props {
    oppgave: SøkYtelseOppgave;
}

const SøkYtelseOppavetekst = ({ oppgave }: Props) => {
    if (oppgave.status !== OppgaveStatus.LØST) {
        return (
            <VStack gap="6">
                <Heading level="1" size="large">
                    Søknad for ungdoms&shy;program&shy;ytelsen
                </Heading>
                <Alert variant="info">
                    Søknaden er mottatt, men vi kan ikke vise mer informasjon enda. Du kan vente litt og så laste siden
                    på nytt.
                </Alert>
                <div>
                    <ForsideLenkeButton />
                </div>
            </VStack>
        );
    }
    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgaveStatus={oppgave.status} oppgaveStatusTekst={getOppgaveStatusText(oppgave)} />
            </div>
            <Heading level="1" size="large">
                Søknad for ungdoms&shy;program&shy;ytelsen
            </Heading>

            <section aria-labelledby="summaryHeading">
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2" id="summaryHeading">
                            Oppsummering
                        </FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>Startdato</FormSummary.Label>
                            <FormSummary.Value>{dateFormatter.full(oppgave.oppgavetypeData.fomDato)}</FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>Dine svar</FormSummary.Label>
                            <FormSummary.Value>
                                Du kan se alle dine svar i søknaden som ligger i{' '}
                                <Link href={getLenker().dokumentarkiv}>dokumentarkivet</Link> på Min side.
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                </FormSummary>
            </section>
            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default SøkYtelseOppavetekst;
