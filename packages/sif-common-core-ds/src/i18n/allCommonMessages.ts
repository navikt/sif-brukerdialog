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
};
const nynorsktekster = {
    ...commonMessagesNn,
    ...validationErrorsNn,
    ...pictureScanningNn,
};

export const allCommonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
