import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '@i18n/index';
import { deleteVedlegg, getAttachmentURLFrontend, uploadVedlegg } from '@navikt/sif-common';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { mapFileToPersistedFile } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { useFormikContext } from 'formik';
import { persist } from '../../api/api';
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
    const andreVedlegg: Attachment[] = values[SøknadFormField.legeerklæring] || [];
    const ref = React.useRef({ attachments });

    const { logUserLoggedOut, logEvent } = useAmplitudeInstance();

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
            <FormikAttachmentForm
                fieldName={SøknadFormField.fødselsattest}
                attachments={attachments}
                includeGuide={true}
                labels={{
                    addLabel: text('steg.omBarnet.fødselsattest.vedlegg'),
                    noAttachmentsText: text('step.oppsummering.omBarn.ingenFødselsattest'),
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
        </>
    );
};

export default FødselsattestPart;
