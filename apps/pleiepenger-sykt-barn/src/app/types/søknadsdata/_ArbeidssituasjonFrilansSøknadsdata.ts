import { DateRange } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidSøknadsdata } from './_NormalarbeidstidSøknadsdata';

type HarIkkeInntektSomFrilanser = {
    harInntektSomFrilanser: false;
};

type KunHonorarMisterIkkeHonorar = {
    harInntektSomFrilanser: true;
    misterInntektSomFrilanser: false;
    honorararbeid: {
        misterHonorar: false;
    };
};

type HarInntektSomFrilanser = {
    harInntektSomFrilanser: true;
    misterInntektSomFrilanser: true;
    erFortsattFrilanser: boolean;
    periodeSomFrilanserISøknadsperiode: DateRange;
    startdato: Date;
    sluttdato?: Date;
    honorararbeid?: FrilansHonorararbeidArbeidssituasjon;
    frilansarbeid?: {
        normalarbeidstid: NormalarbeidstidSøknadsdata;
    };
};

export type FrilansHonorararbeidArbeidssituasjon =
    | {
          misterHonorar: true;
          normalarbeidstid: NormalarbeidstidSøknadsdata;
      }
    | {
          misterHonorar: false;
      };

export type ArbeidssituasjonFrilansSøknadsdata =
    | HarIkkeInntektSomFrilanser
    | KunHonorarMisterIkkeHonorar
    | HarInntektSomFrilanser;
