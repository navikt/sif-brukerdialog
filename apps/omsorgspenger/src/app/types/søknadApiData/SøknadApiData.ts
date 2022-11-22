export interface OmBarnetApiData {
    some: string;
}
export interface DeltBostedApiData {
    some: string;
}

export interface SøknadApiData {
    omBarnet: OmBarnetApiData;
    deltBosted?: DeltBostedApiData;
}
