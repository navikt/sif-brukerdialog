import { FormSummary } from '@navikt/ds-react';
import { TallSvar } from '@navikt/sif-common-ui';

import { UngUiText } from '@ui/i18n';

interface Props {
    måned: string;
    inntekt: number;
}

const RapportertInntektOppsummering = ({ måned, inntekt }: Props) => {
    return (
        <section aria-labelledby="summaryHeading">
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2" id="summaryHeading">
                        <UngUiText id="rapporterInntektOppgavePart.oppsummering" />
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <UngUiText id="rapporterInntektOppgavePart.haddeInntekt" values={{ måned }} />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {inntekt > 0 ? <UngUiText id="Ja" /> : <UngUiText id="Nei" />}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {inntekt > 0 && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <UngUiText id="rapporterInntektOppgavePart.inntektFørSkatt" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <TallSvar verdi={inntekt} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </section>
    );
};

export default RapportertInntektOppsummering;
