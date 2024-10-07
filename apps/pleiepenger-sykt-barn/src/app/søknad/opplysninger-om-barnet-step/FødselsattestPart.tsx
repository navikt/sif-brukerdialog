import { Alert, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import { getAttachmentURLFrontend } from '@navikt/sif-common';
import { ApplikasjonHendelse, SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/src/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    mapFileToPersistedFile,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { useFormikContext } from 'formik';
import { persist, uploadFile } from '../../api/api';
import UploadedDocumentsList from '../../components/fødselsattest-file-list/UploadedDocumentsList';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { relocateToLoginPage } from '../../utils/navigationUtils';

interface Props {
    attachments: Attachment[];
}

const FødselsattestPart: React.FC<Props> = ({ attachments }) => {
    const { text, intl } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const totalSize = getTotalSizeOfAttachments(attachments);
    const ref = React.useRef({ attachments });

    const { logHendelse, logUserLoggedOut, logEvent } = useAmplitudeInstance();

    const vedleggOpplastingFeilet = async (files?: File[]) => {
        if (files) {
            if (files.length > 0) {
                await logHendelse(
                    ApplikasjonHendelse.vedleggOpplastingFeilet,
                    files.map((f) => {
                        const { size, type } = f;
                        return {
                            type,
                            size,
                        };
                    }),
                );
            }
            setFilesThatDidntGetUploaded(files);
        }
    };

    const userNotLoggedIn = async () => {
        await logUserLoggedOut('Opplasting av dokument');
        relocateToLoginPage();
    };

    React.useEffect(() => {
        const hasPendingAttachments = attachments.find((a) => a.pending === true);
        if (hasPendingAttachments) {
            return;
        }
        if (attachments.length !== ref.current.attachments.length) {
            const newValues = attachments.map((a) => {
                const persistedFile = mapFileToPersistedFile(a.file);
                return {
                    ...a,
                    file: persistedFile,
                };
            });
            const valuesToPersist = { ...values, fødselsattest: newValues };
            setFieldValue(SøknadFormField.fødselsattest, newValues);
            persist({ formValues: valuesToPersist, lastStepID: StepID.OPPLYSNINGER_OM_BARNET });
        }
        ref.current = {
            attachments,
        };
    }, [attachments, setFieldValue, values]);

    return (
        <>
            <Heading level="2" size="medium" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                {text('steg.omBarnet.fødselsattest.tittel')}
            </Heading>
            <Block margin="m">
                <AppText id="steg.omBarnet.fødselsattest.info" />
            </Block>
            <Block margin={'l'}>
                <PictureScanningGuide />
            </Block>
            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Block margin="l">
                    <FormikFileUploader
                        legend={text('steg.omBarnet.fødselsattest.vedlegg.legend')}
                        name={SøknadFormField.fødselsattest}
                        attachments={attachments}
                        uploadFile={uploadFile}
                        getAttachmentURLFrontend={getAttachmentURLFrontend}
                        buttonLabel={text('steg.omBarnet.fødselsattest.vedlegg')}
                        onErrorUploadingAttachments={vedleggOpplastingFeilet}
                        onFileInputClick={() => {
                            setFilesThatDidntGetUploaded([]);
                        }}
                        onFilesUploaded={(antall, antallFeilet) => {
                            logEvent(SIFCommonGeneralEvents.vedleggLastetOpp, { antall, antallFeilet });
                        }}
                        onUnauthorizedOrForbiddenUpload={userNotLoggedIn}
                    />
                </Block>
            )}
            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Block margin={'l'}>
                    <Alert variant="warning">
                        <AppText id={'dokumenter.advarsel.totalstørrelse.1'} />
                        <Link target={'_blank'} rel={'noopener noreferrer'} href={getLenker(intl.locale).ettersend}>
                            <AppText id={'dokumenter.advarsel.totalstørrelse.2'} />
                        </Link>
                    </Alert>
                </Block>
            )}
            <Block margin={'l'}>
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <Block margin="l">
                <UploadedDocumentsList wrapNoAttachmentsInBox={true} includeDeletionFunctionality={true} />
            </Block>
        </>
    );
};

export default FødselsattestPart;
