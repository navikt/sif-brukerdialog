import { useAppIntl } from '@i18n/index';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import useAttachmentsHelper from '@navikt/sif-common-core-ds/src/hooks/useAttachmentsHelper';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { relocateToLoginPage } from '../../utils/navigationUtils';
import SøknadFormStep from '../SøknadFormStep';
import usePersistOnChange from '../../hooks/usePersistOnChange';

const LegeerklæringStep = ({ onValidSubmit }: StepCommonProps) => {
    const { values, setFieldValue } = useFormikContext<SøknadFormValues>();
    const { intl, text } = useAppIntl();

    const attachments = values[SøknadFormField.legeerklæring] || [];
    const andreVedlegg: Attachment[] = values[SøknadFormField.fødselsattest] || [];

    const onAttachmentsChange = (changedAttachments: Attachment[]) => {
        const valuesToPersist: SøknadFormValues = { ...values, legeerklæring: changedAttachments };
        setFieldValue(SøknadFormField.legeerklæring, changedAttachments);
        persist({ formValues: valuesToPersist, lastStepID: StepID.LEGEERKLÆRING });
    };

    const { hasPendingUploads, maxTotalSizeExceeded } = useAttachmentsHelper(
        attachments,
        andreVedlegg,
        onAttachmentsChange,
    );

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
            buttonDisabled={hasPendingUploads || maxTotalSizeExceeded}>
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
                validation={{ required: false }}
                uploadLaterURL={getLenker(intl.locale).ettersend}
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
