import { durationTextMessages } from '../components/duration-text/durationText.messages';

const commonMessagesNb = require('./common.nb.json');
const commonMessagesNn = require('./common.nn.json');
const validationErrorsNb = require('./validationErrors.nb.json');
const validationErrorsNn = require('./validationErrors.nn.json');
const pictureScanningNb = require('../components/picture-scanning-guide/picturescanningguide.nb.json');
const pictureScanningNn = require('../components/picture-scanning-guide/picturescanningguide.nn.json');

const bokmålstekster = {
    ...commonMessagesNb,
    ...validationErrorsNb,
    ...pictureScanningNb,
    ...durationTextMessages.nb,
};
const nynorsktekster = {
    ...commonMessagesNn,
    ...validationErrorsNn,
    ...pictureScanningNn,
    ...durationTextMessages.nb,
};

export const allCommonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
