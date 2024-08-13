import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { AppText } from '../../../i18n';
import { Søker } from '../../../types/Søker';
import { FormSummary } from '@navikt/ds-react';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FunctionComponent<Props> = ({ søker }) => {
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
