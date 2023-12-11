export interface Organisasjon {
    navn: string;
    skalJobbe: string;
    skalJobbeProsent: number;
    vetIkkeEkstrainfo?: string | null;
    jobberNormaltTimer: number;
    organisasjonsnummer: string;
}
