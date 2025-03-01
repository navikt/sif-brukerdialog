import { hentDeltakerInfoGittDeltakerIdResponse } from '@navikt/ung-deltakelse-opplyser';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { z } from 'zod';

export const uregistrertDeltakerSchema = hentDeltakerInfoGittDeltakerIdResponse
    .extend({
        id: z.undefined(),
    })
    .transform((dto) => ({
        ...dto,
        registrert: false,
        fødselsdato: ISODateToDate(dto.fødselsdato),
        førsteMuligeInnmeldingsdato: ISODateToDate(dto.førsteMuligeInnmeldingsdato),
        sisteMuligeInnmeldingsdato: ISODateToDate(dto.sisteMuligeInnmeldingsdato),
    }));

export const registrertDeltakerSchema = hentDeltakerInfoGittDeltakerIdResponse
    .extend({
        id: z.string(),
    })
    .transform((dto) => ({
        ...dto,
        registrert: true,
        fødselsdato: ISODateToDate(dto.fødselsdato),
        førsteMuligeInnmeldingsdato: ISODateToDate(dto.førsteMuligeInnmeldingsdato),
        sisteMuligeInnmeldingsdato: ISODateToDate(dto.sisteMuligeInnmeldingsdato),
    }));

export type UregistrertDeltaker = z.infer<typeof uregistrertDeltakerSchema>;
export type Deltaker = z.infer<typeof registrertDeltakerSchema>;
