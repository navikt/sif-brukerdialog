import type { Options as ClientOptions, TDataShape, Client } from './client';
import type { HentSisteGyldigeVedtakForAktorIdData, HentSisteGyldigeVedtakForAktorIdResponses, HentSisteGyldigeVedtakForAktorIdErrors, HentOpplæringsinstitusjonerData, HentOpplæringsinstitusjonerResponses, HentOpplæringsinstitusjonerErrors } from './types.gen';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    client?: Client;
    meta?: Record<string, unknown>;
};
export declare class K9SakController {
    static hentSisteGyldigeVedtakForAktorId<ThrowOnError extends boolean = true>(options: Options<HentSisteGyldigeVedtakForAktorIdData, ThrowOnError>): import("./client").RequestResult<HentSisteGyldigeVedtakForAktorIdResponses, HentSisteGyldigeVedtakForAktorIdErrors, ThrowOnError>;
    static hentOpplæringsinstitusjoner<ThrowOnError extends boolean = true>(options?: Options<HentOpplæringsinstitusjonerData, ThrowOnError>): import("./client").RequestResult<HentOpplæringsinstitusjonerResponses, HentOpplæringsinstitusjonerErrors, ThrowOnError>;
}
//# sourceMappingURL=sdk.gen.d.ts.map