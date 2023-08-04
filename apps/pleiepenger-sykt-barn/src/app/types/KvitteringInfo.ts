import { ArbeidsgiverApiData } from './søknad-api-data/SøknadApiData';
export interface KvitteringInfo {
    fom: Date;
    tom: Date;
    søkernavn: string;
    arbeidsgivere: ArbeidsgiverApiData[];
}
