export enum ScenarioType {
    harIkkeSøkt = 'harIkkeSøkt',
    harSøkt = 'harSøkt',
    ikkeMeldtInn = 'ikkeMeldtInn',
}

export interface ScenarioData {
    søker: any;
    barn: { barn: any[] };
    arbeidsgiver: any[];
    deltakelser: any[];
}
