// This file is auto-generated by @hey-api/openapi-ts

export type ProblemDetail = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    properties?: {
        [key: string]: {
            [key: string]: unknown;
        };
    };
};

export type ArbeidOgFrilansRegisterInntektDto = {
    inntekt: number;
    arbeidsgiver: string;
};

export type DeltakelseOpplysningDto = {
    id?: string;
    deltaker: DeltakerDto;
    fraOgMed: string;
    tilOgMed?: string;
    harSøkt: boolean;
    oppgaver: Array<OppgaveDto>;
};

export type DeltakerDto = {
    id?: string;
    deltakerIdent: string;
};

export type EndretSluttdatoOppgavetypeDataDto = OppgavetypeDataDto & {
    nySluttdato: string;
    veilederRef: string;
    meldingFraVeileder?: string;
};

export type EndretStartdatoOppgavetypeDataDto = OppgavetypeDataDto & {
    nyStartdato: string;
    veilederRef: string;
    meldingFraVeileder?: string;
};

export type KontrollerRegisterinntektOppgavetypeDataDto = OppgavetypeDataDto & {
    fraOgMed: string;
    tilOgMed: string;
    registerinntekt: RegisterinntektDto;
};

export type OppgaveDto = {
    oppgaveReferanse: string;
    oppgavetype: Oppgavetype;
    oppgavetypeData:
        | EndretSluttdatoOppgavetypeDataDto
        | EndretStartdatoOppgavetypeDataDto
        | KontrollerRegisterinntektOppgavetypeDataDto;
    status: OppgaveStatus;
    opprettetDato: string;
    løstDato?: string;
};

export enum OppgaveStatus {
    LØST = 'LØST',
    ULØST = 'ULØST',
    AVBRUTT = 'AVBRUTT',
}

export enum Oppgavetype {
    BEKREFT_ENDRET_STARTDATO = 'BEKREFT_ENDRET_STARTDATO',
    BEKREFT_ENDRET_SLUTTDATO = 'BEKREFT_ENDRET_SLUTTDATO',
    BEKREFT_AVVIK_REGISTERINNTEKT = 'BEKREFT_AVVIK_REGISTERINNTEKT',
}

export type OppgavetypeDataDto = {
    [key: string]: unknown;
};

export type RegisterinntektDto = {
    arbeidOgFrilansInntekter: Array<ArbeidOgFrilansRegisterInntektDto>;
    ytelseInntekter: Array<YtelseRegisterInntektDto>;
    totalInntektArbeidOgFrilans: number;
    totalInntektYtelse: number;
    totalInntekt: number;
};

export type YtelseRegisterInntektDto = {
    inntekt: number;
    ytelsetype: string;
};

export type EndrePeriodeDatoDto = {
    dato: string;
    veilederRef: string;
    meldingFraVeileder?: string;
};

export type DeltakelseUtmeldingDto = {
    utmeldingsdato: string;
};

export type DeltakelseInnmeldingDto = {
    deltakerIdent: string;
    startdato: string;
};

export type AktørIdDto = {
    aktørId: string;
};

export type DeltakerOpplysningerDto = {
    opplysninger: Array<DeltakelseOpplysningDto>;
};

export type DeltakerPersonlia = {
    id?: string;
    deltakerIdent: string;
    navn: Navn;
    fødselsdato: string;
    førsteMuligeInnmeldingsdato: string;
    sisteMuligeInnmeldingsdato: string;
};

export type Navn = {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
};

export type RegisterInntektArbeidOgFrilansDto = {
    beløp: number;
    arbeidsgiverIdent: string;
};

export type RegisterInntektDto = {
    registerinntekterForArbeidOgFrilans?: Array<RegisterInntektArbeidOgFrilansDto>;
    registerinntekterForYtelse?: Array<RegisterInntektYtelseDto>;
};

export type RegisterInntektOppgaveDto = {
    aktørId: string;
    referanse: string;
    frist: string;
    fomDato: string;
    tomDato: string;
    registerInntekter: RegisterInntektDto;
};

export type RegisterInntektYtelseDto = {
    beløp: number;
    ytelseType: string;
};

export type DeltakelsePeriodInfo = {
    id: string;
    fraOgMed: string;
    tilOgMed?: string;
    harSøkt: boolean;
    oppgaver: Array<OppgaveDto>;
    rapporteringsPerioder: Array<RapportPeriodeinfoDto>;
};

export type RapportPeriodeinfoDto = {
    fraOgMed: string;
    tilOgMed: string;
    harRapportert: boolean;
    arbeidstakerOgFrilansInntekt?: number;
    inntektFraYtelse?: number;
    summertInntekt?: number;
};

export type OppdaterFraProgramData = {
    body: DeltakelseOpplysningDto;
    path: {
        deltakelseId: string;
    };
    query?: never;
    url: '/veileder/register/deltakelse/{deltakelseId}/oppdater';
};

export type OppdaterFraProgramErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type OppdaterFraProgramError = OppdaterFraProgramErrors[keyof OppdaterFraProgramErrors];

export type OppdaterFraProgramResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type OppdaterFraProgramResponse = OppdaterFraProgramResponses[keyof OppdaterFraProgramResponses];

export type EndreStartdatoData = {
    body: EndrePeriodeDatoDto;
    path: {
        deltakelseId: string;
    };
    query?: never;
    url: '/veileder/register/deltakelse/{deltakelseId}/endre/startdato';
};

export type EndreStartdatoErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type EndreStartdatoError = EndreStartdatoErrors[keyof EndreStartdatoErrors];

export type EndreStartdatoResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type EndreStartdatoResponse = EndreStartdatoResponses[keyof EndreStartdatoResponses];

export type EndreSluttdatoData = {
    body: EndrePeriodeDatoDto;
    path: {
        deltakelseId: string;
    };
    query?: never;
    url: '/veileder/register/deltakelse/{deltakelseId}/endre/sluttdato';
};

export type EndreSluttdatoErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type EndreSluttdatoError = EndreSluttdatoErrors[keyof EndreSluttdatoErrors];

export type EndreSluttdatoResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type EndreSluttdatoResponse = EndreSluttdatoResponses[keyof EndreSluttdatoResponses];

export type MeldUtDeltakerData = {
    body: DeltakelseUtmeldingDto;
    path: {
        deltakelseId: string;
    };
    query?: never;
    url: '/veileder/register/deltakelse/{deltakelseId}/avslutt';
};

export type MeldUtDeltakerErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type MeldUtDeltakerError = MeldUtDeltakerErrors[keyof MeldUtDeltakerErrors];

export type MeldUtDeltakerResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type MeldUtDeltakerResponse = MeldUtDeltakerResponses[keyof MeldUtDeltakerResponses];

export type MarkerDeltakelseSomSøktData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/deltakelse/register/{id}/marker-har-sokt';
};

export type MarkerDeltakelseSomSøktErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type MarkerDeltakelseSomSøktError = MarkerDeltakelseSomSøktErrors[keyof MarkerDeltakelseSomSøktErrors];

export type MarkerDeltakelseSomSøktResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type MarkerDeltakelseSomSøktResponse = MarkerDeltakelseSomSøktResponses[keyof MarkerDeltakelseSomSøktResponses];

export type LeggTilIProgramData = {
    body: DeltakelseOpplysningDto;
    path?: never;
    query?: never;
    url: '/veileder/register/legg-til';
};

export type LeggTilIProgramErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type LeggTilIProgramError = LeggTilIProgramErrors[keyof LeggTilIProgramErrors];

export type LeggTilIProgramResponses = {
    /**
     * Created
     */
    201: DeltakelseOpplysningDto;
};

export type LeggTilIProgramResponse = LeggTilIProgramResponses[keyof LeggTilIProgramResponses];

export type MeldInnDeltakerData = {
    body: DeltakelseInnmeldingDto;
    path?: never;
    query?: never;
    url: '/veileder/register/deltaker/innmelding';
};

export type MeldInnDeltakerErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type MeldInnDeltakerError = MeldInnDeltakerErrors[keyof MeldInnDeltakerErrors];

export type MeldInnDeltakerResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type MeldInnDeltakerResponse = MeldInnDeltakerResponses[keyof MeldInnDeltakerResponses];

export type HentAlleDeltakelserGittDeltakerAktørData = {
    body: AktørIdDto;
    path?: never;
    query?: never;
    url: '/register/hent/alle';
};

export type HentAlleDeltakelserGittDeltakerAktørErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentAlleDeltakelserGittDeltakerAktørError =
    HentAlleDeltakelserGittDeltakerAktørErrors[keyof HentAlleDeltakelserGittDeltakerAktørErrors];

export type HentAlleDeltakelserGittDeltakerAktørResponses = {
    /**
     * OK
     */
    200: DeltakerOpplysningerDto;
};

export type HentAlleDeltakelserGittDeltakerAktørResponse =
    HentAlleDeltakelserGittDeltakerAktørResponses[keyof HentAlleDeltakelserGittDeltakerAktørResponses];

export type HentDeltakerInfoGittDeltakerData = {
    body: DeltakerDto;
    path?: never;
    query?: never;
    url: '/oppslag/deltaker';
};

export type HentDeltakerInfoGittDeltakerErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentDeltakerInfoGittDeltakerError =
    HentDeltakerInfoGittDeltakerErrors[keyof HentDeltakerInfoGittDeltakerErrors];

export type HentDeltakerInfoGittDeltakerResponses = {
    /**
     * OK
     */
    200: DeltakerPersonlia;
};

export type HentDeltakerInfoGittDeltakerResponse =
    HentDeltakerInfoGittDeltakerResponses[keyof HentDeltakerInfoGittDeltakerResponses];

export type OpprettOppgaveForKontrollAvRegisterinntektData = {
    body: RegisterInntektOppgaveDto;
    path?: never;
    query?: never;
    url: '/oppgave/opprett';
};

export type OpprettOppgaveForKontrollAvRegisterinntektErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type OpprettOppgaveForKontrollAvRegisterinntektError =
    OpprettOppgaveForKontrollAvRegisterinntektErrors[keyof OpprettOppgaveForKontrollAvRegisterinntektErrors];

export type OpprettOppgaveForKontrollAvRegisterinntektResponses = {
    /**
     * OK
     */
    200: DeltakelseOpplysningDto;
};

export type OpprettOppgaveForKontrollAvRegisterinntektResponse =
    OpprettOppgaveForKontrollAvRegisterinntektResponses[keyof OpprettOppgaveForKontrollAvRegisterinntektResponses];

export type AvbrytOppgaveData = {
    body: string;
    path?: never;
    query?: never;
    url: '/oppgave/avbryt';
};

export type AvbrytOppgaveErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type AvbrytOppgaveError = AvbrytOppgaveErrors[keyof AvbrytOppgaveErrors];

export type AvbrytOppgaveResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type HentAlleDeltakelserGittDeltakerIdData = {
    body?: never;
    path: {
        deltakerId: string;
    };
    query?: never;
    url: '/veileder/register/deltaker/{deltakerId}/deltakelser';
};

export type HentAlleDeltakelserGittDeltakerIdErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentAlleDeltakelserGittDeltakerIdError =
    HentAlleDeltakelserGittDeltakerIdErrors[keyof HentAlleDeltakelserGittDeltakerIdErrors];

export type HentAlleDeltakelserGittDeltakerIdResponses = {
    /**
     * OK
     */
    200: Array<DeltakelseOpplysningDto>;
};

export type HentAlleDeltakelserGittDeltakerIdResponse =
    HentAlleDeltakelserGittDeltakerIdResponses[keyof HentAlleDeltakelserGittDeltakerIdResponses];

export type HentDeltakerInfoGittDeltakerIdData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/oppslag/deltaker/{id}';
};

export type HentDeltakerInfoGittDeltakerIdErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentDeltakerInfoGittDeltakerIdError =
    HentDeltakerInfoGittDeltakerIdErrors[keyof HentDeltakerInfoGittDeltakerIdErrors];

export type HentDeltakerInfoGittDeltakerIdResponses = {
    /**
     * OK
     */
    200: DeltakerPersonlia;
};

export type HentDeltakerInfoGittDeltakerIdResponse =
    HentDeltakerInfoGittDeltakerIdResponses[keyof HentDeltakerInfoGittDeltakerIdResponses];

export type HentOppgaveForDeltakelseData = {
    body?: never;
    path: {
        deltakelseId: string;
        oppgaveReferanse: string;
    };
    query?: never;
    url: '/deltakelse/register/{deltakelseId}/oppgave/{oppgaveReferanse}';
};

export type HentOppgaveForDeltakelseErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentOppgaveForDeltakelseError = HentOppgaveForDeltakelseErrors[keyof HentOppgaveForDeltakelseErrors];

export type HentOppgaveForDeltakelseResponses = {
    /**
     * OK
     */
    200: OppgaveDto;
};

export type HentOppgaveForDeltakelseResponse =
    HentOppgaveForDeltakelseResponses[keyof HentOppgaveForDeltakelseResponses];

export type HentAlleMineDeltakelserData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/deltakelse/register/hent/alle';
};

export type HentAlleMineDeltakelserErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type HentAlleMineDeltakelserError = HentAlleMineDeltakelserErrors[keyof HentAlleMineDeltakelserErrors];

export type HentAlleMineDeltakelserResponses = {
    /**
     * OK
     */
    200: Array<DeltakelsePeriodInfo>;
};

export type HentAlleMineDeltakelserResponse = HentAlleMineDeltakelserResponses[keyof HentAlleMineDeltakelserResponses];

export type FjernFraProgramData = {
    body?: never;
    path: {
        deltakelseId: string;
    };
    query?: never;
    url: '/veileder/register/deltakelse/{deltakelseId}/fjern';
};

export type FjernFraProgramErrors = {
    /**
     * Unauthorized
     */
    401: ProblemDetail;
    /**
     * Forbidden
     */
    403: ProblemDetail;
    /**
     * Internal Server Error
     */
    500: ProblemDetail;
};

export type FjernFraProgramError = FjernFraProgramErrors[keyof FjernFraProgramErrors];

export type FjernFraProgramResponses = {
    /**
     * No Content
     */
    204: void;
};

export type FjernFraProgramResponse = FjernFraProgramResponses[keyof FjernFraProgramResponses];

export type ClientOptions = {
    baseURL: 'https://ung-deltakelse-opplyser.intern.dev.nav.no' | (string & {});
};
