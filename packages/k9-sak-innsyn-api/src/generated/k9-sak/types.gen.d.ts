export type ProblemDetail = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    properties?: {
        [key: string]: unknown;
    };
};
export type OmsorgsdagerKronsinskSuktBarnRequestDto = {
    pleietrengendeAktørId: string;
};
export type HentSisteGyldigeVedtakForAktorIdResponse = {
    harInnvilgedeBehandlinger: boolean;
    saksnummer?: string;
    vedtaksdato?: string;
};
export type Opplæringsinstitusjon = {
    uuid: string;
    navn: string;
    perioder: Array<Periode>;
};
export type Periode = {
    fom: string;
    tom: string;
};
export type HentSisteGyldigeVedtakForAktorIdData = {
    body: OmsorgsdagerKronsinskSuktBarnRequestDto;
    path?: never;
    query?: never;
    url: '/k9sak/omsorgsdager-kronisk-sykt-barn/har-gyldig-vedtak';
};
export type HentSisteGyldigeVedtakForAktorIdErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type HentSisteGyldigeVedtakForAktorIdError = HentSisteGyldigeVedtakForAktorIdErrors[keyof HentSisteGyldigeVedtakForAktorIdErrors];
export type HentSisteGyldigeVedtakForAktorIdResponses = {
    200: HentSisteGyldigeVedtakForAktorIdResponse;
};
export type HentSisteGyldigeVedtakForAktorIdResponse2 = HentSisteGyldigeVedtakForAktorIdResponses[keyof HentSisteGyldigeVedtakForAktorIdResponses];
export type HentOpplæringsinstitusjonerData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/k9sak/opplaringsinstitusjoner';
};
export type HentOpplæringsinstitusjonerErrors = {
    400: ProblemDetail;
    401: ProblemDetail;
    403: ProblemDetail;
    500: ProblemDetail;
};
export type HentOpplæringsinstitusjonerError = HentOpplæringsinstitusjonerErrors[keyof HentOpplæringsinstitusjonerErrors];
export type HentOpplæringsinstitusjonerResponses = {
    200: Array<Opplæringsinstitusjon>;
};
export type HentOpplæringsinstitusjonerResponse = HentOpplæringsinstitusjonerResponses[keyof HentOpplæringsinstitusjonerResponses];
export type ClientOptions = {
    baseURL: 'https://k9-sak-innsyn-api.intern.dev.nav.no' | (string & {});
};
//# sourceMappingURL=types.gen.d.ts.map