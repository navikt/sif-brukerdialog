import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FileUploadErrors from '@navikt/sif-common-core/lib/components/file-upload-errors/FileUploadErrors';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import PictureScanningGuide from '@navikt/sif-common-core/lib/components/picture-scanning-guide/PictureScanningGuide';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { useFormikContext } from 'formik';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import FormikFileUploader from '../../components/formik-file-uploader/FormikFileUploader';
import StepIntroduction from '../../components/step-introduction/StepIntroduction';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import getLenker from '../../lenker';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { relocateToLoginPage } from '../../utils/navigationUtils';
import {
    getUnhandledValidationMessage,
    reportUnhandledValidationError,
    validateAttachments,
    ValidateAttachmentsErrors,
} from '../../validation/fieldValidation';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

const SamværsavtaleStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = (values.samværsavtale || []).find((a) => a.pending === true) !== undefined;
    const totalSize = getTotalSizeOfAttachments(values.samværsavtale);
    const sizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    return (
        <SoknadFormStep id={StepID.SAMVÆRSAVTALE} buttonDisabled={hasPendingUploads || sizeOver24Mb}>
            <StepIntroduction>{intlHelper(intl, 'step.samværsavtale.info.title')}</StepIntroduction>
            <Box margin={'l'}>
                <PictureScanningGuide />
            </Box>
            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        name={SoknadFormField.samværsavtale}
                        label={intlHelper(intl, 'step.samværsavtale.vedlegg')}
                        onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                        onFileInputClick={(): void => {
                            setFilesThatDidntGetUploaded([]);
                        }}
                        onUnauthorizedOrForbiddenUpload={(): void => relocateToLoginPage()}
                        validate={(attachments) => {
                            const error = validateAttachments(attachments);
                            switch (error) {
                                case undefined:
                                    return undefined;
                                case ValidateAttachmentsErrors.forMangeFiler:
                                    return intlHelper(intl, 'validation.alleDokumenter.forMangeFiler');
                                case ValidateAttachmentsErrors.samletStørrelseForHøy:
                                    return intlHelper(intl, 'validation.alleDokumenter.samletStørrelseForHøy');
                                default:
                                    reportUnhandledValidationError(error, SoknadFormField.samværsavtale);
                                    return getUnhandledValidationMessage(error, intl);
                            }
                        }}
                    />
                </FormBlock>
            )}

            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Box margin={'l'}>
                    <AlertStripeAdvarsel>
                        <FormattedMessage id={'step.samværsavtale.vedlegg.totalstørrelse.1'} />
                        <Lenke
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={getLenker(intl.locale).ettersendelse}>
                            <FormattedMessage id={'step.samværsavtale.vedlegg.totalstørrelse.2'} />
                        </Lenke>
                        <FormattedMessage id={'step.samværsavtale.vedlegg.totalstørrelse.3'} />
                    </AlertStripeAdvarsel>
                </Box>
            )}

            <Box margin="m">
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Box>
            <Box margin="l">
                <UploadedDocumentsList wrapNoAttachmentsInBox={true} includeDeletionFunctionality={true} />
            </Box>
        </SoknadFormStep>
    );
};

export default SamværsavtaleStep;
