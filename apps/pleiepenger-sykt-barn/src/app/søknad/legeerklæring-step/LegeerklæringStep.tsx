import { useAppIntl } from '@i18n/index';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { FormikAttachmentForm, getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
import usePersistOnChange from '../../hooks/usePersistOnChange';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { relocateToLoginPage } from '../../utils/navigationUtils';
import SøknadFormStep from '../SøknadFormStep';

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

    const { hasPendingUploads } = useAttachmentsHelper(attachments, andreVedlegg, onAttachmentsChange);

    usePersistOnChange(attachments, true, StepID.LEGEERKLÆRING);

    const { logUserLoggedOut } = useAmplitudeInstance();

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
            buttonDisabled={hasPendingUploads}>
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
                labels={{
                    addLabel: text('steg.lege.vedlegg'),
                    noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                }}
                validate={getAttachmentsValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                onUnauthorizedOrForbiddenUpload={userNotLoggedIn}
                otherAttachments={andreVedlegg}
            />
        </SøknadFormStep>
    );
};

export default LegeerklæringStep;
