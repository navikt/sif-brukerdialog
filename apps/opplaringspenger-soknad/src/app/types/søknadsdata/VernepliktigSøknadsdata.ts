export interface HarVærtEllerErVernepliktigYesSøknadsdata {
    type: 'harVærtEllerErVernepliktigYes';
}
export interface HarVærtEllerErVernepliktigNoSøknadsdata {
    type: 'harVærtEllerErVernepliktigNo';
}

export type VernepliktigSøknadsdata =
    | HarVærtEllerErVernepliktigYesSøknadsdata
    | HarVærtEllerErVernepliktigNoSøknadsdata;
