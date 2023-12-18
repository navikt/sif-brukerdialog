import { DateRange } from '@navikt/sif-common-utils';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';
import { Frilanstype } from '../søknad-form-values/FrilansFormValues';

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
    startetFørSisteTreHeleMåneder: boolean;
    startdato: Date;
    sluttdato?: Date;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
};

export type ArbeidssituasjonFrilansSøknadsdata =
    | HarIkkeInntektSomFrilanser
    | KunHonorarMisterIkkeHonorar
    | HarInntektSomFrilanser;
