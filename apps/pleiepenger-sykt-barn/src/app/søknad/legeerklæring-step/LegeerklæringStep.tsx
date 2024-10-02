import { useAppIntl } from '@i18n/index';
import { deleteVedlegg, getAttachmentURLFrontend, uploadVedlegg } from '@navikt/sif-common';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    hasPendingAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { useFormikContext } from 'formik';
import usePersistOnChange from '../../hooks/usePersistOnChange';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { relocateToLoginPage } from '../../utils/navigationUtils';
import SøknadFormStep from '../SøknadFormStep';

const LegeerklæringStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { intl, text } = useAppIntl();

    const attachments: Attachment[] = values ? values[SøknadFormField.legeerklæring] : [];
    const andreVedlegg: Attachment[] = values[SøknadFormField.fødselsattest] || [];
    const hasPendingUploads: boolean = hasPendingAttachments(attachments);
    const totalSize = getTotalSizeOfAttachments(attachments);
    const attachmentsSizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    usePersistOnChange(attachments, true, StepID.LEGEERKLÆRING);

    const { logUserLoggedOut, logEvent } = useAmplitudeInstance();

    const userNotLoggedIn = async () => {
        await logUserLoggedOut('Opplasting av dokument');
        relocateToLoginPage();
    };

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
            <FormikAttachmentForm
                fieldName={SøknadFormField.legeerklæring}
                attachments={attachments}
                includeGuide={true}
                labels={{
                    addLabel: text('steg.lege.vedlegg'),
                    noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                }}
                deleteFile={deleteVedlegg}
                uploadFile={uploadVedlegg}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                getAttachmentURLFrontend={getAttachmentURLFrontend}
                onUnauthorizedOrForbiddenUpload={userNotLoggedIn}
                otherAttachments={andreVedlegg}
                onFilesUploaded={(antall, antallFeilet) => {
                    logEvent(SIFCommonGeneralEvents.vedleggLastetOpp, { antall, antallFeilet });
                }}
            />
        </SøknadFormStep>
    );
};

export default LegeerklæringStep;
