import { avsluttDeltakelseMessages } from '../forms/avslutt-deltakelse-form/avsluttDeltakelseMessages';
import { meldInnDeltakerFormMessages } from '../forms/meld-inn-deltaker-form/meldInnDeltakerMessages';

const nb = {
    ...meldInnDeltakerFormMessages.nb,
    ...avsluttDeltakelseMessages.nb,
};

export const appMessages = {
    nb,
};
