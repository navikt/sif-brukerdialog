import { StepId } from '../../søknad/config/StepId';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LovbestemtFerieSøknadsdata } from './LovbestemtFerieSøknadsdata';

export * from './ArbeidstidSøknadsdata';
export * from './LovbestemtFerieSøknadsdata';

export interface Søknadsdata {
    id: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.ARBEIDSTID]?: ArbeidstidSøknadsdata;
    [StepId.LOVBESTEMT_FERIE]?: LovbestemtFerieSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.MELDING_SENDT]?: any;
}
