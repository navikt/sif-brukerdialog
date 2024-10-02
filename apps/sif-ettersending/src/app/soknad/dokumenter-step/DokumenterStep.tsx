import { deleteVedlegg, getAttachmentURLFrontend, uploadVedlegg } from '@navikt/sif-common';
import React from 'react';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    hasPendingAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SøknadTempStorage from '../soknadTempStorage';
import { VStack } from '@navikt/ds-react';

interface Props {
    søknadstype: Søknadstype;
    søker: Person;
    soknadId: string;
}

const DokumenterStep = ({ søknadstype, søker, soknadId }: Props) => {
    const { text } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();
    const dokumenter: Attachment[] = React.useMemo(() => {
        return values ? values[SoknadFormField.dokumenter] : [];
    }, [values]);
    const hasPendingUploads: boolean = hasPendingAttachments(dokumenter);
    const totalSize = getTotalSizeOfAttachments(values.dokumenter);
    const sizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;
    const ref = React.useRef({ dokumenter });

    const { logUserLoggedOut, logEvent } = useAmplitudeInstance();

    const userLoggedOut = async () => {
        await logUserLoggedOut('Ved opplasting av vedlegg');
        navigateToLoginPage(søknadstype);
    };

    React.useEffect(() => {
        if (hasPendingAttachments(dokumenter)) {
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
                søknadstype,
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
            <VStack gap="8">
                <SifGuidePanel>
                    <p>
                        <AppText id={'steg.dokumenter.infopanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.dokumenter.infopanel.2'} />
                    </p>
                    <p>
                        <AppText id={'steg.dokumenter.infopanel.3'} />
                    </p>
                </SifGuidePanel>

                <FormikAttachmentForm
                    fieldName={SoknadFormField.dokumenter}
                    attachments={dokumenter}
                    includeGuide={true}
                    labels={{
                        addLabel: text('steg.dokumenter.vedlegg'),
                        noAttachmentsText: text('vedleggsliste.ingenVedleggLastetOpp'),
                    }}
                    validation={{ required: true }}
                    deleteFile={deleteVedlegg}
                    uploadFile={uploadVedlegg}
                    getAttachmentURLFrontend={getAttachmentURLFrontend}
                    onUnauthorizedOrForbiddenUpload={userLoggedOut}
                    onFilesUploaded={(antall, antallFeilet) => {
                        logEvent(SIFCommonGeneralEvents.vedleggLastetOpp, { antall, antallFeilet });
                    }}
                />
            </VStack>
        </SoknadFormStep>
    );
};

export default DokumenterStep;
