import { FormSummary } from '@navikt/ds-react';
import { TextareaSvar } from '@navikt/sif-common-ui';
import { BekreftelseDto } from '@navikt/ung-deltakelse-opplyser-api';

interface Props {
    godtarSpørsmål: string;
    bekreftelse: BekreftelseDto;
}

const OppgaveUttalelse = ({ godtarSpørsmål, bekreftelse }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">Du svarte</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>{godtarSpørsmål}</FormSummary.Label>
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
