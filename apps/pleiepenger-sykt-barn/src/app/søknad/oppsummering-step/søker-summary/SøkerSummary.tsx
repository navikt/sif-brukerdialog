import { FormSummary } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FødselsnummerSvar } from '@navikt/sif-common-ui';
import { AppText } from '../../../i18n';

interface Props {
    søker: Søker;
}
const SøkerSummary = ({ søker: { etternavn, mellomnavn, fornavn, fødselsnummer } }: Props) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level="2">
                <AppText id="steg.oppsummering.søker.header" />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.søker.navn" />
                </FormSummary.Label>
                <FormSummary.Value>{formatName(fornavn, etternavn, mellomnavn)}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="steg.oppsummering.søker.fnr" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <FødselsnummerSvar fødselsnummer={fødselsnummer} />
                </FormSummary.Value>
            </FormSummary.Answer>
        </FormSummary.Answers>
    </FormSummary>
);

export default SøkerSummary;
