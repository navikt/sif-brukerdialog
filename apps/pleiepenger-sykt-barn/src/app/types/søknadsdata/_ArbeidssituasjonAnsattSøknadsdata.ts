import { DateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from '../_Arbeidsgiver';
import { NormalarbeidstidSøknadsdata } from './_NormalarbeidstidSøknadsdata';

export enum ArbeidssituasjonAnsattType {
    'sluttetFørSøknadsperiode' = 'sluttetFørSøknadsperiode',
    'sluttetISøknadsperiode' = 'sluttetISøknadsperiode',
    'pågående' = 'pågående',
}

interface ArbeidssituasjonAnsatt {
    type: ArbeidssituasjonAnsattType;
    index: number; // Index i arbeidsgiver-arrayet - skal skrives om
    arbeidsgiver: Arbeidsgiver;
}

interface SluttetFørSøknadsperiode extends ArbeidssituasjonAnsatt {
    type: ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode;
}

interface SluttetISøknadsperiode extends ArbeidssituasjonAnsatt {
    type: ArbeidssituasjonAnsattType.sluttetISøknadsperiode;
    periodeSomAnsattISøknadsperiode: DateRange;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
}

interface AnsattPågående extends ArbeidssituasjonAnsatt {
    type: ArbeidssituasjonAnsattType.pågående;
    periodeSomAnsattISøknadsperiode: DateRange;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
}

export type ArbeidssituasjonAnsattSøknadsdata = SluttetFørSøknadsperiode | SluttetISøknadsperiode | AnsattPågående;
