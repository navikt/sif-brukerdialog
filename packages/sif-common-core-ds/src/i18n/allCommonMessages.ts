import { durationTextMessages } from '../components/duration-text/durationText.messages';
import { pictureScanningNb } from '../components/picture-scanning-guide/picturescanningguide.nb';
import { commonMessagesNb } from './common.nb';
import { validationErrorsNb } from './validationErrors.nb';

const bokmålstekster = {
    ...commonMessagesNb,
    ...validationErrorsNb,
    ...pictureScanningNb,
    ...durationTextMessages.nb,
};

export const allCommonMessages = {
    nb: bokmålstekster,
};
