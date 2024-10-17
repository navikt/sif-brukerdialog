import { FormikAttachmentForm, getAttachmentsValidator } from '@navikt/sif-common-core-ds/src';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { useAppIntl } from '../../../../i18n';
import getLenker from '../../../../lenker';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import { OpplysningerOmPleietrengendeFormFields } from '../OpplysningerOmPleietrengendeForm';

interface Props {
    pleietrengendeId?: Attachment[];
    andreVedlegg?: Attachment[];
}
const IdPart = ({ andreVedlegg = [], pleietrengendeId = [] }: Props) => {
    const { text, intl } = useAppIntl();

    return (
        <FormikAttachmentForm
            fieldName={OpplysningerOmPleietrengendeFormFields.pleietrengendeId}
            attachments={pleietrengendeId}
            otherAttachments={andreVedlegg}
            uploadLaterURL={getLenker(intl.locale).ettersend}
            onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
            validate={getAttachmentsValidator(
                {
                    useDefaultMessages: true,
                },
                andreVedlegg,
            )}
            labels={{
                addLabel: text('step.opplysningerOmPleietrengende.id.uploadButtonLabel'),
                noAttachmentsText: text('vedleggsliste.ingenDokumenter'),
            }}
        />
    );
};

export default IdPart;
