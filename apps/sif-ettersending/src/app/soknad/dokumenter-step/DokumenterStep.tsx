import { VStack } from '@navikt/ds-react';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import useAttachmentsHelper from '@navikt/sif-common-core-ds/src/hooks/useAttachmentsHelper';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SøknadTempStorage from '../soknadTempStorage';

interface Props {
    søknadstype: Søknadstype;
    søker: Person;
    soknadId: string;
}

const DokumenterStep = ({ søknadstype, søker, soknadId }: Props) => {
    const { text } = useAppIntl();
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();

    const onAttachmentsChange = (attachments: Attachment[]) => {
        const formValues = { ...values, dokumenter: attachments };
        setFieldValue(SoknadFormField.dokumenter, attachments);
        SøknadTempStorage.update(
            soknadId,
            formValues,
            StepID.DOKUMENTER,
            {
                søker,
            },
            søknadstype,
        );
    };

    const { hasPendingUploads, maxTotalSizeExceeded } = useAttachmentsHelper(
        values[SoknadFormField.dokumenter],
        [],
        onAttachmentsChange,
    );

    const { logUserLoggedOut, logEvent } = useAmplitudeInstance();

    const userLoggedOut = async () => {
        await logUserLoggedOut('Ved opplasting av vedlegg');
        navigateToLoginPage(søknadstype);
    };

    return (
        <SoknadFormStep
            id={StepID.DOKUMENTER}
            søknadstype={søknadstype}
            buttonDisabled={hasPendingUploads || maxTotalSizeExceeded}>
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
                    attachments={values[SoknadFormField.dokumenter]}
                    includeGuide={true}
                    labels={{
                        addLabel: text('steg.dokumenter.vedlegg'),
                        noAttachmentsText: text('vedleggsliste.ingenVedleggLastetOpp'),
                    }}
                    validation={{ required: true }}
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
