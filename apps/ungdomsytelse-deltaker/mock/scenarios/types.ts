export enum ScenarioType {
    søknad = 'søknad',
    søknadSendt = 'søknadSendt',
    endretStartdato = 'endretStartdato',
    meldtUt = 'meldtUt',
    endretSluttdato = 'endretSluttdato',
    rapporterInntekt = 'rapporterInntekt',
    rapporterInntektSisteMåned = 'rapporterInntektSisteMåned',
    avvikInntekt = 'avvikInntekt',
    avvikInntektSisteMåned = 'avvikInntektSisteMåned',
    avsluttet = 'avsluttet',
    ikkeStartet = 'ikkeStartet',
}

export interface ScenarioData {
    søker: any;
    barn: { barn: any[] };
    arbeidsgiver: any[];
    deltakelser: any[];
}
