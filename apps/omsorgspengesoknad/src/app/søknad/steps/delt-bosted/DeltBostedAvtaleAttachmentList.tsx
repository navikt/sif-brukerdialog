import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/src/utils/listUtils';
import { useFormikContext } from 'formik';
import api from '../../../api/api';
import { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';
import { AppText } from '../../../i18n';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBlock?: boolean;
}

const DeltBostedAvtaleAttachmentList: React.FunctionComponent<Props> = ({
    wrapNoAttachmentsInBlock,
    includeDeletionFunctionality,
}) => {
    const { values, setFieldValue } = useFormikContext<DeltBostedFormValues>();
    const avtale: Attachment[] = values.samværsavtale.filter(({ file }: Attachment) => fileExtensionIsValid(file.name));

    if (!containsAnyUploadedAttachments(avtale)) {
        const noAttachmentsText = (
            <BodyShort>
                <AppText id="vedleggsliste.ingenBostedsavtaleLastetOpp" />
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
                    setFieldValue(DeltBostedFormFields.samværsavtale, avtale);

                    const updateFieldValue = () => {
                        setFieldValue(DeltBostedFormFields.samværsavtale, removeElementFromArray(attachment, avtale));
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

export default DeltBostedAvtaleAttachmentList;
