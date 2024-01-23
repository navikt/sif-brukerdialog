import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import commonNb from './common.nb.json';
import commonNN from './common.nn.json';

const bokmålstekster = {
    ...commonNb,
    ...pictureScanningGuideMessages.nb,
};

type messageKeys = keyof typeof bokmålstekster;

const nynorsktekster: Record<messageKeys, string> = {
    ...commonNN,
    ...pictureScanningGuideMessages.nn,
};

export const commonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
