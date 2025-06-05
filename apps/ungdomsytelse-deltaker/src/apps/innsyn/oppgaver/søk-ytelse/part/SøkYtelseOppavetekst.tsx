import { FormSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus, SøkYtelseOppgave } from '@navikt/ung-common';
import getLenker from '../../../../../utils/lenker';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '../../../components/oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText } from '../../../utils/textUtils';

interface Props {
    oppgave: SøkYtelseOppgave;
}

const SøkYtelseOppavetekst = ({ oppgave }: Props) => {
    if (oppgave.status !== OppgaveStatus.LØST) {
        return null;
    }
    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgaveStatus={oppgave.status} oppgaveStatusTekst={getOppgaveStatusText(oppgave)} />
            </div>
            <Heading level="1" size="large">
                Søknad for ungdomsprogramytelsen
            </Heading>

            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="3">Oppsummering</FormSummary.Heading>
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
            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default SøkYtelseOppavetekst;
