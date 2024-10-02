import { useEffect, useMemo, useRef, useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/src/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { useFormikContext } from 'formik';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import { validateAttachments, ValidateAttachmentsErrors } from '../../../../utils/validateAttachments';
import {
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
} from '../OpplysningerOmPleietrengendeStep';
import IdPartAttachmentList from './IdPartAttachmentList';
import { useAppIntl } from '../../../../i18n';
import { getAttachmentURLFrontend, uploadVedlegg } from '@navikt/sif-common';

//TODO VALIDATE  alleDokumenterISøknaden: Attachment[];
const IdPart = () => {
    const { text } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<OpplysningerOmPleietrengendeFormValues>();

    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = useState<File[]>([]);

    const attachments: Attachment[] = useMemo(() => {
        return values.pleietrengendeId ? values.pleietrengendeId : [];
    }, [values]);

    // const alleDokumenterISøknaden: Attachment[] = valuesToAlleDokumenterISøknaden(values);
    const ref = useRef({ attachments });

    useEffect(() => {
        const hasPendingAttachments = attachments.find((a) => a.pending === true);
        if (hasPendingAttachments) {
            return;
        }
        if (attachments.length !== ref.current.attachments.length) {
            setFieldValue(OpplysningerOmPleietrengendeFormFields.pleietrengendeId, attachments);
        }
        ref.current = {
            attachments,
        };
    }, [attachments, setFieldValue, values]);

    return (
        <>
            <Block margin="l" padBottom="l">
                <PictureScanningGuide />
            </Block>
            <FormikFileUploader
                attachments={values.pleietrengendeId}
                name={OpplysningerOmPleietrengendeFormFields.pleietrengendeId}
                buttonLabel={text('step.opplysningerOmPleietrengende.id.uploadButtonLabel')}
                onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                uploadFile={uploadVedlegg}
                getAttachmentURLFrontend={getAttachmentURLFrontend}
                onFileInputClick={() => {
                    setFilesThatDidntGetUploaded([]);
                }}
                validate={(a: Attachment[] = []) => {
                    return validateAll<ValidateAttachmentsErrors | ValidationError>([
                        () => validateAttachments([...a]),
                    ]);
                }}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
            />
            <Block margin="l">
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <div data-testid="idAttachment-liste">
                <IdPartAttachmentList wrapNoAttachmentsInBlock={true} includeDeletionFunctionality={true} />
            </div>
        </>
    );
};

export default IdPart;
