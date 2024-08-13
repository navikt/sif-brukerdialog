import { FormSummary } from '@navikt/ds-react';
import { AppText } from '../../../i18n';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    annenForelder: AnnenForelderApiData;
}

const OmAnnenForelderOppsummering = ({ annenForelder }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.annenForelder.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.annenForelder.navn" />
                    </FormSummary.Label>
                    <FormSummary.Value>{annenForelder.navn}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.annenForelder.fnr" />
                    </FormSummary.Label>
                    <FormSummary.Value>{annenForelder.fnr}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmAnnenForelderOppsummering;
