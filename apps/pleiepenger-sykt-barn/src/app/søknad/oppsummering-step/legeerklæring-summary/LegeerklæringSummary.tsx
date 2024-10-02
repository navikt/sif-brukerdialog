import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../../i18n';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { useFormikContext } from 'formik';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';

export interface Props {
    onEdit?: () => void;
}

const LegeerklæringSummary = ({ onEdit }: Props) => {
    const {
        values: { legeerklæring },
    } = useFormikContext<SøknadFormValues>();
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
                        <AttachmentList attachments={legeerklæring} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
export default LegeerklæringSummary;
