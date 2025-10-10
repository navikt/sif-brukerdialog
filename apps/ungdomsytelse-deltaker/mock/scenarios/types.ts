export enum ScenarioType {
    søknad = 'søknad',
    søknadSendt = 'søknadSendt',
    endretStartdato = 'endretStartdato',
    meldtUt = 'meldtUt',
    endretSluttdato = 'endretSluttdato',
    rapporterInntekt = 'rapporterInntekt',
    avvikInntekt = 'avvikInntekt',
    avsluttet = 'avsluttet',
    ikkeStartet = 'ikkeStartet',
}

export interface ScenarioData {
    søker: any;
    barn: { barn: any[] };
    arbeidsgiver: any[];
    deltakelser: any[];
}
