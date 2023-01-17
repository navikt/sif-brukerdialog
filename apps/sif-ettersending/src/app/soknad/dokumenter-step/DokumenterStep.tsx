import { Alert, BodyLong } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FileUploadErrors from '@navikt/sif-common-core-ds/lib/components/file-upload-errors/FileUploadErrors';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import PictureScanningGuide from '@navikt/sif-common-core-ds/lib/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { useFormikContext } from 'formik';
import FormikFileUploader from '../../components/formik-file-uploader/FormikFileUploader';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { validateDocuments } from '../../validation/fieldValidations';
import SoknadFormStep from '../SoknadFormStep';
import { ApplicationType } from '../../types/ApplicationType';
import { StepID } from '../soknadStepsConfig';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import SøknadTempStorage from '../soknadTempStorage';
import { Person } from '../../types/Person';

interface Props {
    søknadstype: ApplicationType;
    søker: Person;
    soknadId: string;
}

const DokumenterStep: React.FC<Props> = ({ søknadstype, søker, soknadId }: Props) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();
    const dokumenter: Attachment[] = React.useMemo(() => {
        return values ? values[SoknadFormField.dokumenter] : [];
    }, [values]);
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = dokumenter.find((a) => a.pending === true) !== undefined;

    const totalSize = getTotalSizeOfAttachments(values.dokumenter);
    const sizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;
    const ref = React.useRef({ dokumenter });

    const { logUserLoggedOut, logEvent } = useAmplitudeInstance();

    const userLoggedOut = async () => {
        await logUserLoggedOut('Ved opplasting av vedlegg');
        navigateToLoginPage(søknadstype);
    };

    React.useEffect(() => {
        const hasPendingAttachments = dokumenter.find((a) => a.pending === true);
        if (hasPendingAttachments) {
            return;
        }
        if (dokumenter.length !== ref.current.dokumenter.length) {
            const formValues = { ...values, dokumenter: dokumenter };
            setFieldValue(SoknadFormField.dokumenter, dokumenter);
            SøknadTempStorage.update(
                soknadId,
                formValues,
                StepID.DOKUMENTER,
                {
                    søker,
                },
                søknadstype
            );
        }
        ref.current = {
            dokumenter,
        };
    }, [dokumenter, setFieldValue, soknadId, søker, søknadstype, values]);

    return (
        <SoknadFormStep
            id={StepID.DOKUMENTER}
            søknadstype={søknadstype}
            buttonDisabled={hasPendingUploads || sizeOver24Mb}>
            <SifGuidePanel>
                <BodyLong as="div">
                    <p>
                        <FormattedMessage id={'steg.dokumenter.infopanel.1'} />
                    </p>
                    <p>
                        <FormattedMessage id={'steg.dokumenter.infopanel.2'} />
                    </p>
                    <p>
                        <FormattedMessage id={'steg.dokumenter.infopanel.3'} />
                    </p>
                </BodyLong>
            </SifGuidePanel>

            <Block margin="l">
                <PictureScanningGuide />
            </Block>

            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        name={SoknadFormField.dokumenter}
                        buttonLabel={intlHelper(intl, 'steg.dokumenter.vedlegg')}
                        onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                        onFileInputClick={() => {
                            setFilesThatDidntGetUploaded([]);
                        }}
                        onUnauthorizedOrForbiddenUpload={userLoggedOut}
                        validate={validateDocuments}
                        onFilesUploaded={(antall, antallFeilet) => {
                            logEvent(SIFCommonGeneralEvents.vedleggLastetOpp, { antall, antallFeilet });
                        }}
                    />
                </FormBlock>
            )}

            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Block margin="l">
                    <Alert variant="warning">
                        <FormattedMessage id={'steg.dokumenter.advarsel.totalstørrelse'} />
                    </Alert>
                </Block>
            )}

            <Block margin="m">
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <Block margin="l">
                <UploadedDocumentsList
                    wrapNoAttachmentsInBox={true}
                    includeDeletionFunctionality={true}
                    onFileDeleted={() => {
                        logEvent(SIFCommonGeneralEvents.vedleggSlettet);
                    }}
                />
            </Block>
        </SoknadFormStep>
    );
};

export default DokumenterStep;
