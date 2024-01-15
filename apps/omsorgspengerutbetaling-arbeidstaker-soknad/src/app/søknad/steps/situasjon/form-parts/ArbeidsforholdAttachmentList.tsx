import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/src/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { containsAnyUploadedAttachments } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/src/utils/listUtils';
import { useFormikContext } from 'formik';
import { ArbeidsforholdFormFields, SituasjonFormFields } from '../SituasjonStep';
import api from '../../../../api/api';

interface Props {
    includeDeletionFunctionality: boolean;
    dokumenter: Attachment[];
    fieldName: ArbeidsforholdFormFields;
    wrapNoAttachmentsInBlock?: boolean;
}

const LegeerklæringAvtaleAttachmentList: React.FunctionComponent<Props> = ({
    wrapNoAttachmentsInBlock,
    dokumenter,
    fieldName,
    includeDeletionFunctionality,
}) => {
    const { setFieldValue } = useFormikContext<SituasjonFormFields>();

    if (!containsAnyUploadedAttachments(dokumenter)) {
        const noAttachmentsText = (
            <BodyShort>
                <FormattedMessage id="step.situasjon.vedleggsliste.ingenDokumenterLastetOpp" />
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
                        api.deleteFile(attachment.url).then(updateFieldValue, updateFieldValue);
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={dokumenter} />;
    }
};

export default LegeerklæringAvtaleAttachmentList;
