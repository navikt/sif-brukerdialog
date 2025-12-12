import { ISODateToDate } from '@navikt/sif-common-utils';
import { Diskresjonskode, zHentDeltakerInfoGittDeltakerIdResponse } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { z } from 'zod';

export const uregistrertDeltakerSchema = zHentDeltakerInfoGittDeltakerIdResponse
    .extend({
        id: z.undefined(),
        diskresjonskoder: z.nativeEnum(Diskresjonskode).array(),
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
        diskresjonskoder: z.nativeEnum(Diskresjonskode).array(),
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

export const isRegistrertDeltaker = (deltaker: Deltaker | UregistrertDeltaker): deltaker is Deltaker => {
    return deltaker.id !== undefined && deltaker.registrert === true;
};
