export enum ScenarioType {
    søknad = 'søknad',
    søknadSendt = 'søknadSendt',
    endretStartdato = 'endretStartdato',
    endretStartOgSluttdato = 'endretStartOgSluttdato',
    meldtUt = 'meldtUt',
    endretSluttdato = 'endretSluttdato',
    fjernetPeriode = 'fjernetPeriode',
    rapporterInntekt = 'rapporterInntekt',
    rapporterInntektDelerAvMåned = 'rapporterInntektDelerAvMåned',
    avvikInntekt = 'avvikInntekt',
    avvikInntektDelerAvMåned = 'avvikInntektDelerAvMåned',
    avsluttet = 'avsluttet',
    ikkeStartet = 'ikkeStartet',
    opphørt = 'opphørt',
}

export interface ScenarioData {
    søker: any;
    registrerteBarn: { barn: any[] };
    arbeidsgiver: any[];
    deltakelser: any[];
}
