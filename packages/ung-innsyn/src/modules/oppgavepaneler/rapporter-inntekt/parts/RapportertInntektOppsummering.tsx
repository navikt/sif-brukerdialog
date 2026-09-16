import { FormSummary } from '@navikt/ds-react';
import { TallSvar } from '@navikt/sif-common-ui';

import { UngInnsynText } from '../../../../i18n';

interface Props {
    måned: string;
    inntekt: number;
}

export const RapportertInntektOppsummering = ({ måned, inntekt }: Props) => {
    return (
        <section aria-labelledby="summaryHeading">
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2" id="summaryHeading">
                        <UngInnsynText id="@ungInnsyn.rapporterInntektOppgavePart.oppsummering" />
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <UngInnsynText
                                id="@ungInnsyn.rapporterInntektOppgavePart.haddeInntekt"
                                values={{ måned }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {inntekt > 0 ? <UngInnsynText id="@ungInnsyn.Ja" /> : <UngInnsynText id="@ungInnsyn.Nei" />}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {inntekt > 0 && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <UngInnsynText id="@ungInnsyn.rapporterInntektOppgavePart.inntektFørSkatt" />
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
