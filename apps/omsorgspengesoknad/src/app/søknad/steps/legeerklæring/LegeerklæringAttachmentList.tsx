import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import AttachmentListWithDeletion from '@navikt/sif-common-core-ds/lib/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from '@navikt/sif-common-core-ds/lib/components/attachment-list/AttachmentList';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    containsAnyUploadedAttachments,
    fileExtensionIsValid,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { removeElementFromArray } from '@navikt/sif-common-core-ds/lib/utils/listUtils';
import { useFormikContext } from 'formik';
import api from '../../../api/api';
import { LegeerklæringFormFields, LegeerklæringFormValues } from './LegeerklæringForm';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBlock?: boolean;
    onAttachmentDeleted?: () => void;
}

const LegeerklæringAvtaleAttachmentList: React.FunctionComponent<Props> = ({
    wrapNoAttachmentsInBlock,
    includeDeletionFunctionality,
    onAttachmentDeleted,
}) => {
    const { values, setFieldValue } = useFormikContext<LegeerklæringFormValues>();
    const avtale: Attachment[] = values.vedlegg.filter(({ file }: Attachment) => fileExtensionIsValid(file.name));

    if (!containsAnyUploadedAttachments(avtale)) {
        const noAttachmentsText = (
            <BodyShort>
                <FormattedMessage id="vedleggsliste.ingenLegeerklæringLastetOpp" />
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
                    setFieldValue(LegeerklæringFormFields.vedlegg, avtale);
                    const updateFieldValue = () => {
                        setFieldValue(LegeerklæringFormFields.vedlegg, removeElementFromArray(attachment, avtale));
                        if (onAttachmentDeleted) {
                            onAttachmentDeleted();
                        }
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

export default LegeerklæringAvtaleAttachmentList;
