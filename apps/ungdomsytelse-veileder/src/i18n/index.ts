import { endrePeriodeFormMessages } from '../forms/endre-periode-form/endrePeriodeFormMessages';
import { meldInnDeltakerFormMessages } from '../forms/meld-inn-deltaker-form/meldInnDeltakerMessages';

const nb = {
    ...meldInnDeltakerFormMessages.nb,
    ...endrePeriodeFormMessages.nb,
};

export const appMessages = {
    nb,
    nn: nb,
};
