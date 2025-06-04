import { FormSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus, SendSøknadOppgave } from '@navikt/ung-common';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';
import getLenker from '../../../../utils/lenker';

interface Props {
    oppgave: SendSøknadOppgave;
}

const SendSøknadOppgave = ({ oppgave }: Props) => {
    if (oppgave.status !== OppgaveStatus.LØST) {
        return null;
    }
    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgave={oppgave} />
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
                        <FormSummary.Label>Tidspunkt</FormSummary.Label>
                        <FormSummary.Value>
                            Du sendte inn søknaden{' '}
                            {oppgave.løstDato ? dateFormatter.compactWithTime(oppgave.løstDato) : 'N/A'}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Dine svar</FormSummary.Label>
                        <FormSummary.Value>
                            Du kan se den innsendte søknaden i{' '}
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

export default SendSøknadOppgave;
