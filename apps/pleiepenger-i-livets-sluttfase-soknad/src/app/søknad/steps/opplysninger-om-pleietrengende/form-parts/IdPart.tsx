import { FormikFileUpload, getVedleggValidator } from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { useAppIntl } from '../../../../i18n';
import getLenker from '../../../../lenker';
import { OpplysningerOmPleietrengendeFormFields } from '../OpplysningerOmPleietrengendeForm';

interface Props {
    pleietrengendeId?: Vedlegg[];
    andreVedlegg?: Vedlegg[];
}
const IdPart = ({ andreVedlegg = [], pleietrengendeId = [] }: Props) => {
    const { text, intl } = useAppIntl();

    return (
        <FormikFileUpload
            fieldName={OpplysningerOmPleietrengendeFormFields.pleietrengendeId}
            label={text('step.opplysningerOmPleietrengende.id.uploadButtonLabel')}
            initialFiles={pleietrengendeId}
            otherFiles={andreVedlegg}
            uploadLaterURL={getLenker(intl.locale).ettersend}
            showPictureScanningGuide={true}
            validate={getVedleggValidator(
                {
                    useDefaultMessages: true,
                },
                andreVedlegg,
            )}
        />
    );
};

export default IdPart;
