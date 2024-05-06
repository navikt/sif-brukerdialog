import { Alert, Link } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import { ApplikasjonHendelse, SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/src/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    mapFileToPersistedFile,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { useFormikContext } from 'formik';
import { uploadFile } from '../../api/api';
import LegeerklæringFileList from '../../components/legeerklæring-file-list/LegeerklæringFileList';
import usePersistSoknad from '../../hooks/usePersistSoknad';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';
import { relocateToLoginPage } from '../../utils/navigationUtils';
import { validateLegeerklæring } from '../../validation/fieldValidations';
import SøknadFormStep from '../SøknadFormStep';

const LegeerklæringStep = ({ onValidSubmit }: StepCommonProps) => {
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const { intl, text } = useAppIntl();
    const attachments: Attachment[] = React.useMemo(() => {
        return values ? values[SøknadFormField.legeerklæring] : [];
    }, [values]);
    const hasPendingUploads: boolean = attachments.find((a) => a.pending === true) !== undefined;
    const totalSize = getTotalSizeOfAttachments(attachments);
    const attachmentsSizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;
    const { persistSoknad } = usePersistSoknad();

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
            const formValues = { ...values, legeerklæring: newValues };
            setFieldValue(SøknadFormField.legeerklæring, newValues);
            persistSoknad({ formValues, stepID: StepID.LEGEERKLÆRING });
        }
        ref.current = {
            attachments,
        };
    }, [persistSoknad, attachments, setFieldValue, values]);

    return (
        <SøknadFormStep
            stepId={StepID.LEGEERKLÆRING}
            onValidFormSubmit={() => {
                onValidSubmit();
            }}
            useValidationErrorSummary={false}
            skipValidation={true}
            buttonDisabled={hasPendingUploads || attachmentsSizeOver24Mb}>
            <Block padBottom="xl">
                <SifGuidePanel compact={true}>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.2'} />{' '}
                    </p>
                </SifGuidePanel>
            </Block>

            <Block margin={'l'}>
                <PictureScanningGuide />
            </Block>
            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Block margin="l">
                    <FormikFileUploader
                        uploadFile={(file) => uploadFile(file)}
                        getAttachmentURLFrontend={getAttachmentURLFrontend}
                        legend={text('steg.lege.vedlegg.legend')}
                        name={SøknadFormField.legeerklæring}
                        attachments={attachments}
                        buttonLabel={text('steg.lege.vedlegg')}
                        onErrorUploadingAttachments={vedleggOpplastingFeilet}
                        onFileInputClick={() => {
                            setFilesThatDidntGetUploaded([]);
                        }}
                        validate={validateLegeerklæring}
                        onUnauthorizedOrForbiddenUpload={userNotLoggedIn}
                        onFilesUploaded={(antall, antallFeilet) => {
                            logEvent(SIFCommonGeneralEvents.vedleggLastetOpp, { antall, antallFeilet });
                        }}
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
            <LegeerklæringFileList wrapNoAttachmentsInBox={true} includeDeletionFunctionality={true} />
        </SøknadFormStep>
    );
};

export default LegeerklæringStep;
