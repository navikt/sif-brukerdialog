import { FormattedMessage, useIntl } from 'react-intl';
import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import { typedIntlHelper } from '../utils/intlUtils';

const nb = {
    Ja: 'Ja',
    Nei: 'Nei',
    '@core.common.fileUploadError': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
    '@core.formikAttachmentsList.delete': 'Fjern',
    '@core.AttachmentListV2.fjern': 'Fjern',
    '@core.AttachmentListV2.fjernAriaLabel': 'Fjern {filnavn}',
    '@core.AttachmentListV2.ingenVedlegg': 'Ingen dokumenter er lastet opp',
    '@core.formikAttachmentsList.noFilesUploaded': 'Ingen dokumenter er lastet opp',
    '@core.formik-attachment-form.alert.totalSize':
        'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du <Lenke>ettersende flere dokumenter</Lenke>.',
    '@core.formik-attachment-form.alert.totalSize.noLink':
        'Du har totalt lastet opp mer enn grensen på 24 Mb. Det betyr at du må fjerne noe av det du har lastet opp.',
    ...pictureScanningGuideMessages.nb,
};

type MessageKeys = keyof typeof nb;

const nn: Record<MessageKeys, string> = {
    ...nb,
    ...pictureScanningGuideMessages.nn,
};

export const useCoreIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<MessageKeys>(intl);
};

export type CoreIntlShape = ReturnType<typeof useCoreIntl>;

interface CoreTextProps {
    id: MessageKeys;
    values?: any;
}

export const CoreText = (props: CoreTextProps) => {
    return <FormattedMessage {...props} />;
};

export const commonMessages = {
    nb,
    nn,
};
