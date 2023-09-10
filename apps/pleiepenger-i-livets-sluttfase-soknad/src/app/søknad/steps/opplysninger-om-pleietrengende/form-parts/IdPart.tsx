import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { useIntl } from 'react-intl';
import PictureScanningGuide from '@navikt/sif-common-core-ds/lib/components/picture-scanning-guide/PictureScanningGuide';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
} from '../OpplysningerOmPleietrengendeStep';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { useFormikContext } from 'formik';
import FormikFileUploader from '../../../../components/formik-file-uploader/FormikFileUploader';
import { ApiEndpoint } from '../../../../api/api';
import { ValidateAttachmentsErrors, validateAttachments } from '../../../../utils/validateAttachments';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import FileUploadErrors from '@navikt/sif-common-core-ds/lib/components/file-upload-errors/FileUploadErrors';
import { useEffect, useMemo, useRef, useState } from 'react';
import { validateAll } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib';
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
            <Block margin={'l'} padBottom="m">
                <PictureScanningGuide />
            </Block>
            <FormikFileUploader
                attachments={values.pleietrengendeId}
                name={OpplysningerOmPleietrengendeFormFields.pleietrengendeId}
                buttonLabel={intlHelper(intl, 'step.opplysningerOmPleietrengende.id.uploadButtonLabel')}
                apiEndpoint={ApiEndpoint.vedlegg}
                onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
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
            <Block margin={'l'}>
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <div data-testid="idAttachment-liste">
                <IdPartAttachmentList wrapNoAttachmentsInBlock={true} includeDeletionFunctionality={true} />
            </div>
        </>
    );
};

export default IdPart;
