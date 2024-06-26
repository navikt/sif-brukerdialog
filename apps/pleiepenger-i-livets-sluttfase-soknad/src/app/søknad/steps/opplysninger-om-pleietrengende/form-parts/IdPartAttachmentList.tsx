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
import api from '../../../../api/api';
import {
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
} from '../OpplysningerOmPleietrengendeStep';
import { AppText } from '../../../../i18n';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBlock?: boolean;
}

const IdPartAttachmentList: React.FC<Props> = ({ wrapNoAttachmentsInBlock, includeDeletionFunctionality }) => {
    const { values, setFieldValue } = useFormikContext<OpplysningerOmPleietrengendeFormValues>();
    const idDokumenter: Attachment[] = values.pleietrengendeId.filter(({ file }: Attachment) =>
        fileExtensionIsValid(file.name),
    );

    if (!containsAnyUploadedAttachments(idDokumenter)) {
        const noAttachmentsText = (
            <BodyShort>
                <AppText id="vedleggsliste.ingenDokumenter" />
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
                attachments={idDokumenter}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    attachment.pending = true;
                    setFieldValue(OpplysningerOmPleietrengendeFormFields.pleietrengendeId, idDokumenter);
                    const updateFieldValue = () => {
                        setFieldValue(
                            OpplysningerOmPleietrengendeFormFields.pleietrengendeId,
                            removeElementFromArray(attachment, idDokumenter),
                        );
                    };
                    if (attachment.url) {
                        api.deleteFile(attachment.url).then(updateFieldValue, updateFieldValue);
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={idDokumenter} />;
    }
};

export default IdPartAttachmentList;
