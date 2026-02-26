import {
    zArbeidsgivereDto,
    zFrilansoppdragDto,
    zOrganisasjonDto,
    zPrivatArbeidsgiverDto,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { zNullableDateTime } from '../schemas/zDateSchemas';

const zAnsattPeriode = z.object({
    ansattFom: zNullableDateTime.optional(),
    ansattTom: zNullableDateTime.optional(),
});

// Schema som konverterer string-dato til Date
const organisasjonSchema = zOrganisasjonDto.extend({
    ...zAnsattPeriode.shape,
});

const privatArbeidsgiverSchema = zPrivatArbeidsgiverDto.extend({
    ...zAnsattPeriode.shape,
});

const frilansoppdragSchema = zFrilansoppdragDto.extend({
    ...zAnsattPeriode.shape,
});

export const arbeidsgivereSchema = zArbeidsgivereDto.extend({
    organisasjoner: z.array(organisasjonSchema),
    privateArbeidsgivere: z.array(privatArbeidsgiverSchema).optional(),
    frilansoppdrag: z.array(frilansoppdragSchema).optional(),
});

// Eksportere typer med nye navn
export type ArbeidsgiverOrganisasjon = z.infer<typeof organisasjonSchema>;
export type ArbeidsgiverPrivatperson = z.infer<typeof privatArbeidsgiverSchema>;
export type ArbeidsgiverFrilansoppdrag = z.infer<typeof frilansoppdragSchema>;
export type Arbeidsgivere = z.infer<typeof arbeidsgivereSchema>;
