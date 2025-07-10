import { z } from 'zod';
export declare const zProblemDetail: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNumber>;
    detail: z.ZodOptional<z.ZodString>;
    instance: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    properties?: {} | undefined;
}, {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    properties?: {} | undefined;
}>;
export declare const zOmsorgsdagerKronsinskSuktBarnRequestDto: z.ZodObject<{
    pleietrengendeAktørId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pleietrengendeAktørId: string;
}, {
    pleietrengendeAktørId: string;
}>;
export declare const zHentSisteGyldigeVedtakForAktorIdResponse: z.ZodObject<{
    harInnvilgedeBehandlinger: z.ZodBoolean;
    saksnummer: z.ZodOptional<z.ZodString>;
    vedtaksdato: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    harInnvilgedeBehandlinger: boolean;
    saksnummer?: string | undefined;
    vedtaksdato?: string | undefined;
}, {
    harInnvilgedeBehandlinger: boolean;
    saksnummer?: string | undefined;
    vedtaksdato?: string | undefined;
}>;
export declare const zPeriode: z.ZodObject<{
    fom: z.ZodString;
    tom: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fom: string;
    tom: string;
}, {
    fom: string;
    tom: string;
}>;
export declare const zOpplæringsinstitusjon: z.ZodObject<{
    uuid: z.ZodString;
    navn: z.ZodString;
    perioder: z.ZodArray<z.ZodObject<{
        fom: z.ZodString;
        tom: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fom: string;
        tom: string;
    }, {
        fom: string;
        tom: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    navn: string;
    perioder: {
        fom: string;
        tom: string;
    }[];
}, {
    uuid: string;
    navn: string;
    perioder: {
        fom: string;
        tom: string;
    }[];
}>;
export declare const zHentSisteGyldigeVedtakForAktorIdData: z.ZodObject<{
    body: z.ZodObject<{
        pleietrengendeAktørId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pleietrengendeAktørId: string;
    }, {
        pleietrengendeAktørId: string;
    }>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    body: {
        pleietrengendeAktørId: string;
    };
    query?: undefined;
    path?: undefined;
}, {
    body: {
        pleietrengendeAktørId: string;
    };
    query?: undefined;
    path?: undefined;
}>;
export declare const zHentSisteGyldigeVedtakForAktorIdResponse2: z.ZodObject<{
    harInnvilgedeBehandlinger: z.ZodBoolean;
    saksnummer: z.ZodOptional<z.ZodString>;
    vedtaksdato: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    harInnvilgedeBehandlinger: boolean;
    saksnummer?: string | undefined;
    vedtaksdato?: string | undefined;
}, {
    harInnvilgedeBehandlinger: boolean;
    saksnummer?: string | undefined;
    vedtaksdato?: string | undefined;
}>;
export declare const zHentOpplæringsinstitusjonerData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
export declare const zHentOpplæringsinstitusjonerResponse: z.ZodArray<z.ZodObject<{
    uuid: z.ZodString;
    navn: z.ZodString;
    perioder: z.ZodArray<z.ZodObject<{
        fom: z.ZodString;
        tom: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fom: string;
        tom: string;
    }, {
        fom: string;
        tom: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    navn: string;
    perioder: {
        fom: string;
        tom: string;
    }[];
}, {
    uuid: string;
    navn: string;
    perioder: {
        fom: string;
        tom: string;
    }[];
}>, "many">;
//# sourceMappingURL=zod.gen.d.ts.map