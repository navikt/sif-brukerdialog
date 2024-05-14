import { FormattedMessage, useIntl } from 'react-intl';
import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import { typedIntlHelper } from '../utils/intlUtils';

const nb = {
    Ja: 'Ja',
    Nei: 'Nei',
    'common.fileUploadError': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
    'common.vedleggsliste.fjernKnapp': 'Fjern',
    ...pictureScanningGuideMessages.nb,
};

type MessageKeys = keyof typeof nb;

const nn: Record<MessageKeys, string> = {
    Ja: 'Ja',
    Nei: 'Nei',
    'common.fileUploadError': 'Det har dessverre skjedd ein feil under opplasting av følgjande vedlegg:',
    'common.vedleggsliste.fjernKnapp': 'Fjern',
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
