import {
    zArbeidsgivereDto,
    zFrilansoppdragDto,
    zOrganisasjonDto,
    zPrivatArbeidsgiverDto,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

import { zNullableDateTime } from '../schemas/zJsonDateSchemas';

// Schema som konverterer string-dato til Date
const organisasjonSchema = zOrganisasjonDto.extend({
    ansattFom: zNullableDateTime,
    ansattTom: zNullableDateTime,
});

const privatArbeidsgiverSchema = zPrivatArbeidsgiverDto.extend({
    ansattFom: zNullableDateTime,
    ansattTom: zNullableDateTime,
});

const frilansoppdragSchema = zFrilansoppdragDto.extend({
    ansattFom: zNullableDateTime,
    ansattTom: zNullableDateTime,
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
