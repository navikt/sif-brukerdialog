import { FormSummary } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { AppText } from '../../../../i18n';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering = ({ søker }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.søker.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.søker.navn" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.søker.fnr" />
                    </FormSummary.Label>
                    <FormSummary.Value>{søker.fødselsnummer}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmSøkerOppsummering;
