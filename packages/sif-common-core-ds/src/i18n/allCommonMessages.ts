import { durationTextMessages } from '../components/duration-text/durationText.messages';
import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';
import { commonMessagesNb } from './common.nb';
import { validationErrorsNb } from './validationErrors.nb';

const bokmålstekster = {
    ...commonMessagesNb,
    ...validationErrorsNb,
    ...pictureScanningGuideMessages.nb,
    ...durationTextMessages.nb,
};

export const allCommonMessages = {
    nb: bokmålstekster,
};
