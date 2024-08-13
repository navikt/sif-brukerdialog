import { FormSummary } from '@navikt/ds-react';
import { AppText } from '../../../i18n';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    barn: ApiBarn[];
}

const OmBarnaOppsummering = ({ barn }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.omBarna.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.omBarna.barn" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <BarnSummaryList barn={barn} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmBarnaOppsummering;
