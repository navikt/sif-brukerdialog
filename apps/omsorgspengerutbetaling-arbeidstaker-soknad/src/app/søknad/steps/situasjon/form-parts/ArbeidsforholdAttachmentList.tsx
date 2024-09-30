import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { deleteVedlegg } from '@navikt/sif-common';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { containsAnyUploadedAttachments } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/src/utils/listUtils';
import { useFormikContext } from 'formik';
import { AppText } from '../../../../i18n';
import { ArbeidsforholdFormFields, SituasjonFormFields } from '../SituasjonStep';

interface Props {
    includeDeletionFunctionality: boolean;
    dokumenter: Attachment[];
    fieldName: ArbeidsforholdFormFields;
    wrapNoAttachmentsInBlock?: boolean;
}

const ArbeidsforholdAttachmentList: React.FunctionComponent<Props> = ({
    wrapNoAttachmentsInBlock,
    dokumenter,
    fieldName,
    includeDeletionFunctionality,
}) => {
    const { setFieldValue } = useFormikContext<SituasjonFormFields>();

    if (!containsAnyUploadedAttachments(dokumenter)) {
        const noAttachmentsText = (
            <BodyShort>
                <AppText id="step.situasjon.vedleggsliste.ingenDokumenterLastetOpp" />
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
                attachments={dokumenter}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    attachment.pending = true;
                    setFieldValue(fieldName, dokumenter);
                    const updateFieldValue = () => {
                        setFieldValue(fieldName, removeElementFromArray(attachment, dokumenter));
                    };
                    if (attachment.url) {
                        deleteVedlegg(attachment.url).then(updateFieldValue, updateFieldValue);
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={dokumenter} />;
    }
};

export default ArbeidsforholdAttachmentList;
