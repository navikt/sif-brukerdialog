import { ArbeidsgivereDto } from '@navikt/k9-brukerdialog-prosessering-api';

import { arbeidsgivansenAS, norskBedriftAS, vingeFlyfly } from '../entiteter/organisasjoner';

export const arbeidsgivereEnOrgResponse: ArbeidsgivereDto = {
    organisasjoner: [arbeidsgivansenAS],
};

export const arbeidsgivereToOrgResponse: ArbeidsgivereDto = {
    organisasjoner: [norskBedriftAS, vingeFlyfly],
};

export const arbeidsgivereTomResponse: ArbeidsgivereDto = {
    organisasjoner: [],
};
