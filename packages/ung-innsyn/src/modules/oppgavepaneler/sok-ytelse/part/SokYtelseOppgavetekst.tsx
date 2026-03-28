import { Alert, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';

import { ForsideLenkeButton, OppgaveStatusTag } from '../../../../components';
import { UngUiText } from '../../../../i18n';
import { getOppgaveStatusText } from '../../../../utils/textUtils';

interface Props {
    oppgave: SøkYtelseOppgave;
}

export const SøkYtelseOppgavetekst = ({ oppgave }: Props) => {
    if (oppgave.status !== OppgaveStatus.LØST) {
        return (
            <VStack gap="space-24">
                <Heading level="1" size="large">
                    <UngUiText id="@ungInnsyn.oppgavetype.SØK_YTELSE.oppgavetittel" />
                </Heading>
                <Alert variant="info">
                    <UngUiText id="@ungInnsyn.søkYtelseOppgave.uløst.info" />
                </Alert>
                <div>
                    <ForsideLenkeButton />
                </div>
            </VStack>
        );
    }
    return (
        <VStack gap="space-24">
            <div>
                <OppgaveStatusTag oppgaveStatus={oppgave.status} oppgaveStatusTekst={getOppgaveStatusText(oppgave)} />
            </div>
            <Heading level="1" size="large">
                <UngUiText id="@ungInnsyn.oppgavetype.SØK_YTELSE.oppgavetittel" />
            </Heading>
            <section aria-labelledby="summaryHeading">
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2" id="summaryHeading">
                            <UngUiText id="@ungInnsyn.søkYtelseOppgave.oppsummering.tittel" />
                        </FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <UngUiText id="@ungInnsyn.søkYtelseOppgave.oppsummering.startdato" />
                            </FormSummary.Label>
                            <FormSummary.Value>{dateFormatter.full(oppgave.oppgavetypeData.fomDato)}</FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <UngUiText id="@ungInnsyn.søkYtelseOppgave.oppsummering.dineSvar" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <UngUiText
                                    id="@ungInnsyn.søkYtelseOppgave.oppsummering.dineSvar.tekst"
                                    values={{
                                        link: (chunks: React.ReactNode) => (
                                            <Link href="#" target="_blank" rel="noreferrer">
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
