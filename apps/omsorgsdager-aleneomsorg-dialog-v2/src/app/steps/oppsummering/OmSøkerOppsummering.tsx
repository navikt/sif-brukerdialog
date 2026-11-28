import { AppText } from '@app/i18n';
import { FormSummary } from '@navikt/ds-react';
import type { Søker } from '@sif/api/k9-brukerdialog-prosessering';
import { formatName } from '@sif/utils';

export const OmSøkerOppsummering = ({ søker }: { søker: Søker }) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level="2">
                <AppText id="oppsummeringSteg.søker.header" />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="oppsummeringSteg.søker.navn" />
                </FormSummary.Label>
                <FormSummary.Value>{formatName(søker)}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="oppsummeringSteg.søker.fnr" />
                </FormSummary.Label>
                <FormSummary.Value>{søker.fødselsnummer}</FormSummary.Value>
            </FormSummary.Answer>
        </FormSummary.Answers>
    </FormSummary>
);
