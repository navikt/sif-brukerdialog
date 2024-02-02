import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';

const bokmålstekster = {
    Ja: 'Ja',
    Nei: 'Nei',
    'common.fileUploadError': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
    'common.vedleggsliste.fjernKnapp': 'Fjern',
    ...pictureScanningGuideMessages.nb,
};

type messageKeys = keyof typeof bokmålstekster;

const nynorsktekster: Record<messageKeys, string> = {
    Ja: 'Ja',
    Nei: 'Nei',
    'common.fileUploadError': 'Det har dessverre skjedd ein feil under opplasting av følgjande vedlegg:',
    'common.vedleggsliste.fjernKnapp': 'Fjern',
    ...pictureScanningGuideMessages.nn,
};

export const commonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
