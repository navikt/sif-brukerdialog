import { FormSummary } from '@navikt/ds-react';
import EditStepLink from '../../../components/edit-step-link/EditStepLink';
import LegeerklæringAttachmentList from '../../../components/legeerklæring-file-list/LegeerklæringFileList';
import { AppText } from '../../../i18n';

export interface Props {
    onEdit?: () => void;
}

const LegeerklæringSummary = ({ onEdit }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="steg.oppsummering.vedlegg.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="steg.oppsummering.vedlegg.listTitle" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <LegeerklæringAttachmentList includeDeletionFunctionality={false} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
export default LegeerklæringSummary;
