import { endrePeriodeFormMessages } from '../forms/endre-periode-forms/endrePeriodeFormMessages';
import { meldInnDeltakerFormMessages } from '../forms/meld-inn-deltaker-form/meldInnDeltakerMessages';
import { slettAktivDeltakerMessages } from '../forms/slett-aktiv-deltaker-form/slettAktivDeltakerMessages';
import { slettSluttdatoMessages } from '../forms/slett-sluttdato-form/slettSluttdatoFormMessages';

const nb = {
    ...meldInnDeltakerFormMessages.nb,
    ...endrePeriodeFormMessages.nb,
    ...slettAktivDeltakerMessages.nb,
    ...slettSluttdatoMessages.nb,
};

export const appMessages = {
    nb,
    nn: nb,
};
