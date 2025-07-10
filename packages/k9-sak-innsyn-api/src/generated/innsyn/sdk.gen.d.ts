import type { Options as ClientOptions, TDataShape, Client } from './client';
import type { HentSøknaderData, HentSøknaderResponses, HentSøknaderErrors, LastNedArbeidsgivermeldingData, LastNedArbeidsgivermeldingResponses, LastNedArbeidsgivermeldingErrors, HentMineSakerData, HentMineSakerResponses, HentMineSakerErrors, HentSaksbehandlingstidData, HentSaksbehandlingstidResponses, HentSaksbehandlingstidErrors, HentDokumentData, HentDokumentResponses, HentDokumentErrors } from './types.gen';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    client?: Client;
    meta?: Record<string, unknown>;
};
export declare class SØknadController {
    static hentSøknader<ThrowOnError extends boolean = true>(options?: Options<HentSøknaderData, ThrowOnError>): import("./client").RequestResult<HentSøknaderResponses, HentSøknaderErrors, ThrowOnError>;
    static lastNedArbeidsgivermelding<ThrowOnError extends boolean = true>(options: Options<LastNedArbeidsgivermeldingData, ThrowOnError>): import("./client").RequestResult<LastNedArbeidsgivermeldingResponses, LastNedArbeidsgivermeldingErrors, ThrowOnError>;
}
export declare class SakController {
    static hentMineSaker<ThrowOnError extends boolean = true>(options?: Options<HentMineSakerData, ThrowOnError>): import("./client").RequestResult<HentMineSakerResponses, HentMineSakerErrors, ThrowOnError>;
    static hentSaksbehandlingstid<ThrowOnError extends boolean = true>(options?: Options<HentSaksbehandlingstidData, ThrowOnError>): import("./client").RequestResult<HentSaksbehandlingstidResponses, HentSaksbehandlingstidErrors, ThrowOnError>;
}
export declare class DokumentController {
    static hentDokument<ThrowOnError extends boolean = true>(options: Options<HentDokumentData, ThrowOnError>): import("./client").RequestResult<HentDokumentResponses, HentDokumentErrors, ThrowOnError>;
}
//# sourceMappingURL=sdk.gen.d.ts.map