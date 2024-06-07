import React from 'react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { useAppIntl } from '../../../i18n';
import { Søker } from '../../../types/Søker';
import { FormSummary } from '@navikt/ds-react';

interface Props {
    søker: Søker;
}
const OmSøkerOppsummering: React.FunctionComponent<Props> = ({ søker }) => {
    const { text } = useAppIntl();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('steg.oppsummering.søker.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Navn</FormSummary.Label>
                    <FormSummary.Value>
                        {formatName(søker.fornavn, søker.etternavn, søker.mellomnavn)}
                        <br />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>Fødselsnummer</FormSummary.Label>
                    <FormSummary.Value>{søker.fødselsnummer}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmSøkerOppsummering;
