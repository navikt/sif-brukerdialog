import { DateRange } from '@navikt/sif-common-utils';

import { Frilanstype } from '../søknad-form-values/FrilansFormValues';
import { NormalarbeidstidSøknadsdata } from './NormalarbeidstidSøknadsdata';

type HarIkkeInntektSomFrilanser = {
    harInntektSomFrilanser: false;
    /** Hvis bruker har frilansoppdrag spør vi om normalarbeidstid om bruker
     * svarer nei på frilanser og omsorgsstønad.
     */
    normalarbeidstid?: NormalarbeidstidSøknadsdata;
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
