import { FormattedMessage } from 'react-intl';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/lib/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/lib/utils/listUtils';
import { connect, useFormikContext } from 'formik';
import { deleteFile } from '../../api/api';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';

interface LegeerklæringAttachmentListProps {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBox?: boolean;
}

type Props = LegeerklæringAttachmentListProps;

const LegeerklæringAttachmentList = ({ wrapNoAttachmentsInBox, includeDeletionFunctionality }: Props) => {
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const legeerklæring: Attachment[] = values[SøknadFormField.legeerklæring].filter(({ file }: Attachment) =>
        fileExtensionIsValid(file.name),
    );

    if (!containsAnyUploadedAttachments(legeerklæring)) {
        const noAttachmentsText = (
            <p data-testid="ingenLegeerklæring">
                <FormattedMessage id="vedleggsliste.ingenLegeerklæringLastetOpp" />
            </p>
        );
        if (wrapNoAttachmentsInBox) {
            return <Block margin="m">{noAttachmentsText}</Block>;
        }
        return noAttachmentsText;
    }

    if (includeDeletionFunctionality) {
        return (
            <AttachmentListWithDeletion
                attachments={legeerklæring}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    setFieldValue(SøknadFormField.legeerklæring, removeElementFromArray(attachment, legeerklæring));
                    if (attachment.url) {
                        deleteFile(attachment.url);
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={legeerklæring} />;
    }
};

export default connect<LegeerklæringAttachmentListProps, SøknadFormField>(LegeerklæringAttachmentList);
