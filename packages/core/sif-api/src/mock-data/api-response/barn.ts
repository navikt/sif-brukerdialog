import { BarnOppslagListe } from '@navikt/k9-brukerdialog-prosessering-api';

import { alfaTestesen, betaTestesen } from '../entiteter/barn';

export const barnListeEttBarn: BarnOppslagListe = {
    barn: [alfaTestesen],
};

export const barnListeToBarn: BarnOppslagListe = {
    barn: [alfaTestesen, betaTestesen],
};

export const barnListeTom: BarnOppslagListe = {
    barn: [],
};
