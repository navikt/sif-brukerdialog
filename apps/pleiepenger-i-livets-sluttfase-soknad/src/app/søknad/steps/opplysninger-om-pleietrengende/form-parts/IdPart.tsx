import { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/src/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { useFormikContext } from 'formik';
import api, { ApiEndpoint } from '../../../../api/api';
import { getAttachmentURLFrontend } from '../../../../utils/attachmentUtilsAuthToken';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import { validateAttachments, ValidateAttachmentsErrors } from '../../../../utils/validateAttachments';
import {
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
} from '../OpplysningerOmPleietrengendeStep';
import IdPartAttachmentList from './IdPartAttachmentList';

//TODO VALIDATE  alleDokumenterISøknaden: Attachment[];
const IdPart = () => {
    const intl = useIntl();
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
                buttonLabel={intlHelper(intl, 'step.opplysningerOmPleietrengende.id.uploadButtonLabel')}
                onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                uploadFile={(file: File) => api.uploadFile(ApiEndpoint.vedlegg, file)}
                getAttachmentURLFrontend={getAttachmentURLFrontend}
                onFileInputClick={() => {
                    setFilesThatDidntGetUploaded([]);
                }}
                validate={(attachments: Attachment[] = []) => {
                    return validateAll<ValidateAttachmentsErrors | ValidationError>([
                        () => validateAttachments([...attachments]),
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
