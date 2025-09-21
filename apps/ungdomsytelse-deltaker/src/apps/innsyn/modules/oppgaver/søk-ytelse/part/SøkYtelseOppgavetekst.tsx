import ForsideLenkeButton from '@innsyn/atoms/forside-lenke-button/ForsideLenkeButton';
import OppgaveStatusTag from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText } from '@innsyn/utils/textUtils';
import { Alert, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { SøkYtelseOppgave } from '@shared/types/Oppgave';
import getLenker from '@shared/utils/lenker';

import { AppText } from '@shared/i18n';

interface Props {
    oppgave: SøkYtelseOppgave;
}

const SøkYtelseOppavetekst = ({ oppgave }: Props) => {
    if (oppgave.status !== OppgaveStatus.LØST) {
        return (
            <VStack gap="6">
                <Heading level="1" size="large">
                    <AppText id="oppgavetype.SØK_YTELSE.oppgavetittel" />
                </Heading>
                <Alert variant="info">
                    <AppText id="søkYtelseOppgave.uløst.info" />
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
                <AppText id="oppgavetype.SØK_YTELSE.oppgavetittel" />
            </Heading>

            <section aria-labelledby="summaryHeading">
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2" id="summaryHeading">
                            <AppText id="søkYtelseOppgave.oppsummering.tittel" />
                        </FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="søkYtelseOppgave.oppsummering.startdato" />
                            </FormSummary.Label>
                            <FormSummary.Value>{dateFormatter.full(oppgave.oppgavetypeData.fomDato)}</FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="søkYtelseOppgave.oppsummering.dineSvar" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <AppText
                                    id="søkYtelseOppgave.oppsummering.dineSvar.tekst"
                                    values={{
                                        link: (chunks: React.ReactNode) => (
                                            <Link href={getLenker().dokumentarkiv} target="_blank" rel="noreferrer">
                                                {chunks}
                                            </Link>
                                        ),
                                    }}
                                />
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
