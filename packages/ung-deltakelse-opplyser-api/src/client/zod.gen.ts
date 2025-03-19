// This file is auto-generated by @hey-api/openapi-ts

import { z } from 'zod';

export const zProblemDetail = z.object({
    type: z.string().url().optional(),
    title: z.string().optional(),
    status: z.number().int().optional(),
    detail: z.string().optional(),
    instance: z.string().url().optional(),
    properties: z.object({}).optional(),
});

export const zDeltakelseOpplysningDto = z.object({
    id: z.string().uuid().optional(),
    deltaker: z.object({
        id: z.string().uuid().optional(),
        deltakerIdent: z.string(),
    }),
    fraOgMed: z.string().date(),
    tilOgMed: z.string().date().optional(),
    harSøkt: z.boolean(),
    oppgaver: z.array(
        z.object({
            id: z.string().uuid(),
            oppgavetype: z.enum(['BEKREFT_ENDRET_STARTDATO', 'BEKREFT_ENDRET_SLUTTDATO', 'BEKREFT_KORRIGERT_INNTEKT']),
            oppgavetypeData: z.union([
                z.object({}).merge(
                    z.object({
                        nySluttdato: z.string().date(),
                        veilederRef: z.string(),
                        meldingFraVeileder: z.string().optional(),
                    }),
                ),
                z.object({}).merge(
                    z.object({
                        nyStartdato: z.string().date(),
                        veilederRef: z.string(),
                        meldingFraVeileder: z.string().optional(),
                    }),
                ),
                z.object({}).merge(
                    z.object({
                        inntektFraAinntekt: z.object({
                            arbeidsgivere: z.array(
                                z.object({
                                    navn: z.string(),
                                    beløp: z.number(),
                                }),
                            ),
                            ytelser: z.array(
                                z.object({
                                    navn: z.string(),
                                    beløp: z.number(),
                                }),
                            ),
                        }),
                        inntektFraDeltaker: z.object({
                            arbeidstakerOgFrilansInntekt: z.number().optional(),
                            inntektFraYtelse: z.number().optional(),
                        }),
                        periodeForInntekt: z.object({
                            fraOgMed: z.string().date(),
                            tilOgMed: z.string().date(),
                        }),
                    }),
                ),
            ]),
            status: z.enum(['LØST', 'ULØST', 'KANSELLERT', 'UTLØPT']),
            opprettetDato: z.string().datetime(),
            løstDato: z.string().datetime().optional(),
        }),
    ),
});

export const zDeltakerDto = z.object({
    id: z.string().uuid().optional(),
    deltakerIdent: z.string(),
});

export const zEndretSluttdatoOppgavetypeDataDto = z.object({}).merge(
    z.object({
        nySluttdato: z.string().date(),
        veilederRef: z.string(),
        meldingFraVeileder: z.string().optional(),
    }),
);

export const zEndretStartdatoOppgavetypeDataDto = z.object({}).merge(
    z.object({
        nyStartdato: z.string().date(),
        veilederRef: z.string(),
        meldingFraVeileder: z.string().optional(),
    }),
);

export const zKorrigertOppgavetypeDataDto = z.object({}).merge(
    z.object({
        inntektFraAinntekt: z.object({
            arbeidsgivere: z.array(
                z.object({
                    navn: z.string(),
                    beløp: z.number(),
                }),
            ),
            ytelser: z.array(
                z.object({
                    navn: z.string(),
                    beløp: z.number(),
                }),
            ),
        }),
        inntektFraDeltaker: z.object({
            arbeidstakerOgFrilansInntekt: z.number().optional(),
            inntektFraYtelse: z.number().optional(),
        }),
        periodeForInntekt: z.object({
            fraOgMed: z.string().date(),
            tilOgMed: z.string().date(),
        }),
    }),
);

export const zOppgaveDto = z.object({
    id: z.string().uuid(),
    oppgavetype: z.enum(['BEKREFT_ENDRET_STARTDATO', 'BEKREFT_ENDRET_SLUTTDATO', 'BEKREFT_KORRIGERT_INNTEKT']),
    oppgavetypeData: z.union([
        zEndretSluttdatoOppgavetypeDataDto,
        zEndretStartdatoOppgavetypeDataDto,
        zKorrigertOppgavetypeDataDto,
    ]),
    status: z.enum(['LØST', 'ULØST', 'KANSELLERT', 'UTLØPT']),
    opprettetDato: z.string().datetime(),
    løstDato: z.string().datetime().optional(),
});

export const zOppgaveStatus = z.enum(['LØST', 'ULØST', 'KANSELLERT', 'UTLØPT']);

export const zOppgavetype = z.enum(['BEKREFT_ENDRET_STARTDATO', 'BEKREFT_ENDRET_SLUTTDATO']);

export const zOppgavetypeDataDto = z.object({});

export const zEndrePeriodeDatoDto = z.object({
    dato: z.string().date(),
    veilederRef: z.string(),
    meldingFraVeileder: z.string().optional(),
});

export const zDeltakelseUtmeldingDto = z.object({
    utmeldingsdato: z.string().date(),
});

export const zDeltakelseInnmeldingDto = z.object({
    deltakerIdent: z.string(),
    startdato: z.string().date(),
});

export const zAktørIdDto = z.object({
    aktørId: z.string(),
});

export const zDeltakerOpplysningerDto = z.object({
    opplysninger: z.array(zDeltakelseOpplysningDto),
});

export const zDeltakerPersonlia = z.object({
    id: z.string().uuid().optional(),
    deltakerIdent: z.string(),
    navn: z.object({
        fornavn: z.string(),
        mellomnavn: z.string().optional(),
        etternavn: z.string(),
    }),
    fødselsdato: z.string().date(),
    sisteMuligeInnmeldingsdato: z.string().date(),
    førsteMuligeInnmeldingsdato: z.string().date(),
});

export const zNavn = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().optional(),
    etternavn: z.string(),
});

export const zDeltakelsePeriodInfo = z.object({
    id: z.string().uuid(),
    fraOgMed: z.string().date(),
    tilOgMed: z.string().date().optional(),
    harSøkt: z.boolean(),
    oppgaver: z.array(zOppgaveDto),
    rapporteringsPerioder: z.array(
        z.object({
            fraOgMed: z.string().date(),
            tilOgMed: z.string().date(),
            harRapportert: z.boolean(),
            arbeidstakerOgFrilansInntekt: z.number().optional(),
            inntektFraYtelse: z.number().optional(),
        }),
    ),
});

export const zRapportPeriodeinfoDto = z.object({
    fraOgMed: z.string().date(),
    tilOgMed: z.string().date(),
    harRapportert: z.boolean(),
    arbeidstakerOgFrilansInntekt: z.number().optional(),
    inntektFraYtelse: z.number().optional(),
});

export const zOppdaterFraProgramResponse = zDeltakelseOpplysningDto;

export const zEndreStartdatoResponse = zDeltakelseOpplysningDto;

export const zEndreSluttdatoResponse = zDeltakelseOpplysningDto;

export const zMeldUtDeltakerResponse = zDeltakelseOpplysningDto;

export const zMarkerDeltakelseSomSøktResponse = zDeltakelseOpplysningDto;

export const zLeggTilIProgramResponse = zDeltakelseOpplysningDto;

export const zMeldInnDeltakerResponse = zDeltakelseOpplysningDto;

export const zHentAlleDeltakelserGittDeltakerAktørResponse = zDeltakerOpplysningerDto;

export const zHentDeltakerInfoGittDeltakerResponse = zDeltakerPersonlia;

export const zHentAlleDeltakelserGittDeltakerIdResponse = z.array(zDeltakelseOpplysningDto);

export const zHentDeltakerInfoGittDeltakerIdResponse = zDeltakerPersonlia;

export const zHentOppgaveForDeltakelseResponse = zOppgaveDto;

export const zHentAlleMineDeltakelserResponse = z.array(zDeltakelsePeriodInfo);

export const zFjernFraProgramResponse = z.void();
