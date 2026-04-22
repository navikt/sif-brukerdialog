import { zBarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { alfaTestesen, betaTestesen } from '../entiteter/barn';

export const barnListeEttBarn: z.input<typeof zBarnOppslagListe> = {
    barn: [alfaTestesen],
};

export const barnListeToBarn: z.input<typeof zBarnOppslagListe> = {
    barn: [alfaTestesen, betaTestesen],
};

export const barnListeTom: z.input<typeof zBarnOppslagListe> = {
    barn: [],
};
