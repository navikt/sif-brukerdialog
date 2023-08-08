import { DateRange } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';
import { Frilanstype } from '../FrilansFormData';

type HarIkkeInntektSomFrilanser = {
    harInntektSomFrilanser: false;
};

type KunHonorarMisterIkkeHonorar = {
    type: Frilanstype.HONORAR;
    harInntektSomFrilanser: true;
    misterInntektSomFrilanser: false;
    misterHonorar: false;
};

type HarInntektSomFrilanser = {
    type: Frilanstype;
    harInntektSomFrilanser: true;
    misterInntektSomFrilanser: true;
    erFortsattFrilanser: boolean;
    misterHonorar?: true;
    periodeSomFrilanserISøknadsperiode: DateRange;
    startdato: Date;
    sluttdato?: Date;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
};

export type ArbeidssituasjonFrilansSøknadsdata =
    | HarIkkeInntektSomFrilanser
    | KunHonorarMisterIkkeHonorar
    | HarInntektSomFrilanser;
