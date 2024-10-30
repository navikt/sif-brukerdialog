import { Heading, VStack } from '@navikt/ds-react';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { useFormikContext } from 'formik';
import { relocateToLoginPage } from '../../../../../utils/navigationUtils';
import actionsCreator from '../../../../context/action/actionCreator';
import { useSøknadContext } from '../../../../context/hooks/useSøknadContext';
import { OmBarnetFormText as Text, useOmBarnetFormIntl } from '../omBarnetFormMessages';
import { OmBarnetFormFields, OmBarnetFormValues } from '../types';

interface Props {
    fødselsattester: Attachment[];
    andreVedlegg: Attachment[];
    ettersendelseURL: string;
}

const FødselsattestPart: React.FC<Props> = ({ fødselsattester, andreVedlegg, ettersendelseURL }) => {
    const { text } = useOmBarnetFormIntl();
    const { setFieldValue } = useFormikContext<OmBarnetFormValues>();
    const { dispatch } = useSøknadContext();

    const { logUserLoggedOut } = useAmplitudeInstance();

    const userNotLoggedIn = async () => {
        await logUserLoggedOut('Opplasting av dokument');
        relocateToLoginPage();
    };

    const onAttachmentsChange = (changedAttachments: Attachment[]) => {
        setFieldValue(OmBarnetFormFields.fødselsattest, changedAttachments);
        dispatch(actionsCreator.requestLagreSøknad());
    };

    useAttachmentsHelper(fødselsattester, andreVedlegg, onAttachmentsChange);

    return (
        <VStack gap="6">
            <Heading level="2" size="medium" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                {text('omBarnetForm.fødselsattest.tittel')}
            </Heading>
            <Text id="omBarnetForm.fødselsattest.info" />
            <FormikAttachmentForm
                fieldName={OmBarnetFormFields.fødselsattest}
                attachments={fødselsattester}
                labels={{
                    addLabel: text('omBarnetForm.fødselsattest.vedlegg'),
                    noAttachmentsText: text('omBarnetForm.fødselsattest.ingenVedlegg'),
                }}
                validate={getAttachmentsValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={ettersendelseURL}
                onUnauthorizedOrForbiddenUpload={userNotLoggedIn}
                otherAttachments={andreVedlegg}
            />
        </VStack>
    );
};

export default FødselsattestPart;
