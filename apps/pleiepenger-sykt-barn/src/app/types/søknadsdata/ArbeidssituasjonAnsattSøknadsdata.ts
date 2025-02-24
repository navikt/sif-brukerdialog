import { DateRange } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../Arbeidsgiver';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

export enum ArbeidssituasjonAnsattType {
    'ikkeAnsattUkjentSluttdato' = 'ikkeAnsattUkjentSluttdato',
    'sluttetFørSøknadsperiode' = 'sluttetFørSøknadsperiode',
    'sluttetISøknadsperiode' = 'sluttetISøknadsperiode',
    'pågående' = 'pågående',
}

interface ArbeidssituasjonAnsatt {
    type: ArbeidssituasjonAnsattType;
    index: number /** Index i arbeidsgiver-arrayet - skal skrives om */;
    arbeidsgiver: Arbeidsgiver;
}

interface ArbeidssituasjonIkkeAnsattUkjentSluttdato {
    type: ArbeidssituasjonAnsattType.ikkeAnsattUkjentSluttdato;
    index: number /** Index i arbeidsgiver-arrayet - skal skrives om */;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
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

export type ArbeidssituasjonAnsattSøknadsdata =
    | SluttetFørSøknadsperiode
    | SluttetISøknadsperiode
    | AnsattPågående
    | ArbeidssituasjonIkkeAnsattUkjentSluttdato;
