import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import api, { ApiEndpoint } from '../../../../api/api';
import { useAppIntl } from '../../../../i18n';
import getLenker from '../../../../lenker';
import { getAttachmentURLFrontend } from '../../../../utils/attachmentUtils';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import { OpplysningerOmPleietrengendeFormFields } from '../OpplysningerOmPleietrengendeStep';

interface Props {
    pleietrengendeId?: Attachment[];
    andreVedlegg?: Attachment[];
}
const IdPart = ({ pleietrengendeId = [], andreVedlegg = [] }: Props) => {
    const { text, intl } = useAppIntl();

    return (
        <FormikAttachmentForm
            fieldName={OpplysningerOmPleietrengendeFormFields.pleietrengendeId}
            includeGuide={true}
            attachments={pleietrengendeId}
            otherAttachments={andreVedlegg}
            uploadLaterURL={getLenker(intl.locale).ettersend}
            onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
            uploadFile={(file) => api.uploadFile(ApiEndpoint.vedlegg, file)}
            deleteFile={api.deleteFile}
            getAttachmentURLFrontend={getAttachmentURLFrontend}
            validation={{ required: false }}
            labels={{
                addLabel: text('step.opplysningerOmPleietrengende.id.uploadButtonLabel'),
                noAttachmentsText: text('vedleggsliste.ingenDokumenter'),
            }}
        />
    );
};

export default IdPart;
