import { durationTextMessages } from '../components/duration-text/durationText.messages';
import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import commonNb from './common.nb.json';
import commonNN from './common.nn.json';

const bokmålstekster = {
    ...commonNb,
    ...pictureScanningGuideMessages.nb,
    ...durationTextMessages.nb,
};

type messageKeys = keyof typeof bokmålstekster;

const nynorsktekster: Record<messageKeys, string> = {
    ...commonNN,
    ...durationTextMessages.nn,
    ...pictureScanningGuideMessages.nn,
};

export const commonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
