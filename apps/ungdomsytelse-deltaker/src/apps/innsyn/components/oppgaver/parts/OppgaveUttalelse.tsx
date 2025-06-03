import { BoxNew, FormSummary } from '@navikt/ds-react';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { BekreftelseDto } from '@navikt/ung-deltakelse-opplyser-api';

interface Props {
    beskjedFraNav: React.ReactNode;
    spørsmål: string;
    bekreftelse: BekreftelseDto;
}

const OppgaveUttalelse = ({ beskjedFraNav, spørsmål, bekreftelse }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">Beskjed og ditt svar</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Beskjed fra Nav</FormSummary.Label>
                    <FormSummary.Value>
                        <BoxNew background="accent-moderate" borderRadius="large" padding="4">
                            {beskjedFraNav}
                        </BoxNew>
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>{spørsmål}</FormSummary.Label>
                    <FormSummary.Value>{bekreftelse.harGodtattEndringen ? 'Ja' : 'Nei'}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            {!bekreftelse.harGodtattEndringen && bekreftelse.uttalelseFraBruker && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Kommentar</FormSummary.Label>
                        <FormSummary.Value>
                            <TextareaSvar text={bekreftelse.uttalelseFraBruker} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            )}
        </FormSummary>
    );
};

export default OppgaveUttalelse;
