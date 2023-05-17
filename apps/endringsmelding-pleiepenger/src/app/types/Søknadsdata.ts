import { StepId } from '../søknad/config/StepId';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LovbestemtFerieSøknadsdata } from './LovbestemtFerieSøknadsdata';
import { UkjentArbeidsforholdSøknadsdata } from './UkjentArbeidsforholdSøknadsdata';

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
