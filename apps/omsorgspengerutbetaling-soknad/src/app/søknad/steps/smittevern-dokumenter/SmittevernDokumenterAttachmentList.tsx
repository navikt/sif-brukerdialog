import { BodyShort } from '@navikt/ds-react';
import React from 'react';
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
import { useFormikContext } from 'formik';
import api from '../../../api/api';
import { SmittevernDokumenterFormFields, SmittevernDokumenterFormValues } from './SmittevernDokumenterForm';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBlock?: boolean;
}

const SmittevernDokumenterAttachmentList: React.FC<Props> = ({
    wrapNoAttachmentsInBlock,
    includeDeletionFunctionality,
}) => {
    const { values, setFieldValue } = useFormikContext<SmittevernDokumenterFormValues>();
    const avtale: Attachment[] = values.vedlegg.filter(({ file }: Attachment) => fileExtensionIsValid(file.name));

    if (!containsAnyUploadedAttachments(avtale)) {
        const noAttachmentsText = (
            <BodyShort>
                <FormattedMessage id="vedleggsliste.ingenDokumenterLastetOpp" />
            </BodyShort>
        );
        if (wrapNoAttachmentsInBlock) {
            return <Block margin="m">{noAttachmentsText}</Block>;
        }
        return noAttachmentsText;
    }

    if (includeDeletionFunctionality) {
        return (
            <AttachmentListWithDeletion
                attachments={avtale}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    attachment.pending = true;
                    setFieldValue(SmittevernDokumenterFormFields.vedlegg, avtale);
                    const updateFieldValue = () => {
                        setFieldValue(
                            SmittevernDokumenterFormFields.vedlegg,
                            removeElementFromArray(attachment, avtale)
                        );
                    };
                    if (attachment.url) {
                        api.deleteFile(attachment.url).then(updateFieldValue, updateFieldValue);
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={avtale} />;
    }
};

export default SmittevernDokumenterAttachmentList;
