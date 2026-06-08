import { endrePeriodeFormMessages } from '../forms/endre-periode-forms/endrePeriodeFormMessages';
import { meldInnDeltakerFormMessages } from '../forms/meld-inn-deltaker-form/meldInnDeltakerMessages';
import { slettAktivDeltakerMessages } from '../forms/slett-aktiv-deltaker-form/slettAktivDeltakerMessages';

const nb = {
    ...meldInnDeltakerFormMessages.nb,
    ...endrePeriodeFormMessages.nb,
    ...slettAktivDeltakerMessages.nb,
};

export const appMessages = {
    nb,
    nn: nb,
};
