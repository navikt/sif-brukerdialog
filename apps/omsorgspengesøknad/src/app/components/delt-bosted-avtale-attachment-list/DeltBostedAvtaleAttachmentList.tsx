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
import api from '../../api/api';
import { DeltBostedFormFields, DeltBostedFormValues } from '../../søknad/steps/delt-bosted/DeltBostedForm';

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
                <FormattedMessage id="vedleggsliste.ingenBostedsavtaleLastetOpp" />
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
                    if (attachment.url) {
                        api.deleteFile(attachment.url).then(
                            () => {
                                setFieldValue(
                                    DeltBostedFormFields.samværsavtale,
                                    removeElementFromArray(attachment, avtale)
                                );
                            },
                            () => {
                                setFieldValue(
                                    DeltBostedFormFields.samværsavtale,
                                    removeElementFromArray(attachment, avtale)
                                );
                            }
                        );
                    }
                }}
            />
        );
    } else {
        return <AttachmentList attachments={avtale} />;
    }
};

export default DeltBostedAvtaleAttachmentList;
