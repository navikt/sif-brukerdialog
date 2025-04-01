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

export const zArbeidOgFrilansRegisterInntektDto = z.object({
    inntekt: z.number().int(),
    arbeidsgiver: z.string(),
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
            oppgaveReferanse: z.string().uuid(),
            oppgavetype: z.enum([
                'BEKREFT_ENDRET_STARTDATO',
                'BEKREFT_ENDRET_SLUTTDATO',
                'BEKREFT_AVVIK_REGISTERINNTEKT',
            ]),
            oppgavetypeData: z.union([
                z.object({}).merge(
                    z.object({
                        nySluttdato: z.string().date(),
                    }),
                ),
                z.object({}).merge(
                    z.object({
                        nyStartdato: z.string().date(),
                    }),
                ),
                z.object({}).merge(
                    z.object({
                        fraOgMed: z.string().date(),
                        tilOgMed: z.string().date(),
                        registerinntekt: z.object({
                            arbeidOgFrilansInntekter: z.array(zArbeidOgFrilansRegisterInntektDto),
                            ytelseInntekter: z.array(
                                z.object({
                                    inntekt: z.number().int(),
                                    ytelsetype: z.string(),
                                }),
                            ),
                            totalInntektArbeidOgFrilans: z.number().int(),
                            totalInntektYtelse: z.number().int(),
                            totalInntekt: z.number().int(),
                        }),
                    }),
                ),
            ]),
            status: z.enum(['LØST', 'ULØST', 'AVBRUTT']),
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
    }),
);

export const zEndretStartdatoOppgavetypeDataDto = z.object({}).merge(
    z.object({
        nyStartdato: z.string().date(),
    }),
);

export const zKontrollerRegisterinntektOppgavetypeDataDto = z.object({}).merge(
    z.object({
        fraOgMed: z.string().date(),
        tilOgMed: z.string().date(),
        registerinntekt: z.object({
            arbeidOgFrilansInntekter: z.array(zArbeidOgFrilansRegisterInntektDto),
            ytelseInntekter: z.array(
                z.object({
                    inntekt: z.number().int(),
                    ytelsetype: z.string(),
                }),
            ),
            totalInntektArbeidOgFrilans: z.number().int(),
            totalInntektYtelse: z.number().int(),
            totalInntekt: z.number().int(),
        }),
    }),
);

export const zOppgaveDto = z.object({
    oppgaveReferanse: z.string().uuid(),
    oppgavetype: z.enum(['BEKREFT_ENDRET_STARTDATO', 'BEKREFT_ENDRET_SLUTTDATO', 'BEKREFT_AVVIK_REGISTERINNTEKT']),
    oppgavetypeData: z.union([
        zEndretSluttdatoOppgavetypeDataDto,
        zEndretStartdatoOppgavetypeDataDto,
        zKontrollerRegisterinntektOppgavetypeDataDto,
    ]),
    status: z.enum(['LØST', 'ULØST', 'AVBRUTT']),
    opprettetDato: z.string().datetime(),
    løstDato: z.string().datetime().optional(),
});

export const zOppgaveStatus = z.enum(['LØST', 'ULØST', 'AVBRUTT']);

export const zOppgavetype = z.enum([
    'BEKREFT_ENDRET_STARTDATO',
    'BEKREFT_ENDRET_SLUTTDATO',
    'BEKREFT_AVVIK_REGISTERINNTEKT',
]);

export const zOppgavetypeDataDto = z.object({});

export const zRegisterinntektDto = z.object({
    arbeidOgFrilansInntekter: z.array(zArbeidOgFrilansRegisterInntektDto),
    ytelseInntekter: z.array(
        z.object({
            inntekt: z.number().int(),
            ytelsetype: z.string(),
        }),
    ),
    totalInntektArbeidOgFrilans: z.number().int(),
    totalInntektYtelse: z.number().int(),
    totalInntekt: z.number().int(),
});

export const zYtelseRegisterInntektDto = z.object({
    inntekt: z.number().int(),
    ytelsetype: z.string(),
});

export const zEndrePeriodeDatoDto = z.object({
    dato: z.string().date(),
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
    førsteMuligeInnmeldingsdato: z.string().date(),
    sisteMuligeInnmeldingsdato: z.string().date(),
});

export const zNavn = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().optional(),
    etternavn: z.string(),
});

export const zRegisterInntektArbeidOgFrilansDto = z.object({
    beløp: z.number().int(),
    arbeidsgiverIdent: z.string(),
});

export const zRegisterInntektDto = z.object({
    registerinntekterForArbeidOgFrilans: z.array(zRegisterInntektArbeidOgFrilansDto).optional(),
    registerinntekterForYtelse: z
        .array(
            z.object({
                beløp: z.number().int(),
                ytelseType: z.string(),
            }),
        )
        .optional(),
});

export const zRegisterInntektOppgaveDto = z.object({
    aktørId: z.string(),
    referanse: z.string().uuid(),
    frist: z.string().datetime(),
    fomDato: z.string().date(),
    tomDato: z.string().date(),
    registerInntekter: zRegisterInntektDto,
});

export const zRegisterInntektYtelseDto = z.object({
    beløp: z.number().int(),
    ytelseType: z.string(),
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
            summertInntekt: z.number().optional(),
        }),
    ),
});

export const zRapportPeriodeinfoDto = z.object({
    fraOgMed: z.string().date(),
    tilOgMed: z.string().date(),
    harRapportert: z.boolean(),
    arbeidstakerOgFrilansInntekt: z.number().optional(),
    inntektFraYtelse: z.number().optional(),
    summertInntekt: z.number().optional(),
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

export const zOpprettOppgaveForKontrollAvRegisterinntektResponse = zDeltakelseOpplysningDto;

export const zHentAlleDeltakelserGittDeltakerIdResponse = z.array(zDeltakelseOpplysningDto);

export const zHentDeltakerInfoGittDeltakerIdResponse = zDeltakerPersonlia;

export const zHentOppgaveForDeltakelseResponse = zOppgaveDto;

export const zHentAlleMineDeltakelserResponse = z.array(zDeltakelsePeriodInfo);

export const zFjernFraProgramResponse = z.void();
