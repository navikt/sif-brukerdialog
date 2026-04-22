import { zArbeidsgivereDto } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { arbeidsgivansenAS, norskBedriftAS, vingeFlyfly } from '../entiteter/organisasjoner';

export const arbeidsgivereEnOrgResponse: z.input<typeof zArbeidsgivereDto> = {
    organisasjoner: [arbeidsgivansenAS],
};

export const arbeidsgivereToOrgResponse: z.input<typeof zArbeidsgivereDto> = {
    organisasjoner: [norskBedriftAS, vingeFlyfly],
};

export const arbeidsgivereTomResponse: z.input<typeof zArbeidsgivereDto> = {
    organisasjoner: [],
};
