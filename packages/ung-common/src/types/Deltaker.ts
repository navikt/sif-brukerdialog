import { zHentDeltakerInfoGittDeltakerIdResponse } from '@navikt/ung-deltakelse-opplyser-api';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { z } from 'zod';

export const uregistrertDeltakerSchema = zHentDeltakerInfoGittDeltakerIdResponse
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

export const registrertDeltakerSchema = zHentDeltakerInfoGittDeltakerIdResponse
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
