import { StepId } from '../søknad/config/StepId';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LovbestemtFerieSøknadsdata } from './LovbestemtFerieSøknadsdata';
import { TilsynsordningForenkletSøknadsdata } from './TilsynsordningForenkletSøknadsdata';
import { TilsynsordningSøknadsdata } from './TilsynsordningSøknadsdata';
import { UkjentArbeidsforholdSøknadsdata } from './UkjentArbeidsforholdSøknadsdata';

export interface Søknadsdata {
    id: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.UKJENT_ARBEIDSFOHOLD]?: UkjentArbeidsforholdSøknadsdata;
    [StepId.ARBEIDSTID]?: ArbeidstidSøknadsdata;
    [StepId.LOVBESTEMT_FERIE]?: LovbestemtFerieSøknadsdata;
    [StepId.TILSYNSORDNING]?: TilsynsordningSøknadsdata;
    [StepId.TILSYNSORDNING_FORENKLET]?: TilsynsordningForenkletSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.MELDING_SENDT]?: any;
}
