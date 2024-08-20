import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../i18n';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    barn: ApiBarn[];
    onEdit?: () => void;
}

const OmBarnaOppsummering = ({ barn, onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.omBarna.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
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
