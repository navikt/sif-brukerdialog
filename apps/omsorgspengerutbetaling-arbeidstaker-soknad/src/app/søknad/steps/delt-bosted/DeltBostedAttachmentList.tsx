import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { deleteVedlegg } from '@navikt/sif-common';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/src/utils/listUtils';
import { useFormikContext } from 'formik';
import { AppText } from '../../../i18n';
import { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBlock?: boolean;
}

const DeltBostedAttachmentList: React.FunctionComponent<Props> = ({
    wrapNoAttachmentsInBlock,
    includeDeletionFunctionality,
}) => {
    const { values, setFieldValue } = useFormikContext<DeltBostedFormValues>();
    const avtale: Attachment[] = values.vedlegg.filter(({ file }: Attachment) => fileExtensionIsValid(file.name));

    if (!containsAnyUploadedAttachments(avtale)) {
        const noAttachmentsText = (
            <BodyShort>
                <AppText id="vedleggsliste.ingenAvtaleLastetOpp" />
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
                    setFieldValue(DeltBostedFormFields.vedlegg, avtale);
                    const updateFieldValue = () => {
                        setFieldValue(DeltBostedFormFields.vedlegg, removeElementFromArray(attachment, avtale));
                    };
                    if (attachment.url) {
                        deleteVedlegg(attachment).then(updateFieldValue, updateFieldValue);
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={avtale} />;
    }
};

export default DeltBostedAttachmentList;
