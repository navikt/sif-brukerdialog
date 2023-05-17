import { StepId } from '../../søknad/config/StepId';
import { UkjentArbeidsforholdSøknadsdata } from './UkjentArbeidsforholdSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LovbestemtFerieSøknadsdata } from './LovbestemtFerieSøknadsdata';

export * from './UkjentArbeidsforholdSøknadsdata';
export * from './ArbeidstidSøknadsdata';
export * from './LovbestemtFerieSøknadsdata';

export interface Søknadsdata {
    id: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.UKJENT_ARBEIDSFOHOLD]?: UkjentArbeidsforholdSøknadsdata;
    [StepId.ARBEIDSTID]?: ArbeidstidSøknadsdata;
    [StepId.LOVBESTEMT_FERIE]?: LovbestemtFerieSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.MELDING_SENDT]?: any;
}
