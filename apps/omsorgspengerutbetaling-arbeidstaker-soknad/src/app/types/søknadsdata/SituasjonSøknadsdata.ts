import { Utbetalingsårsak, ÅrsakNyoppstartet } from '../ArbeidsforholdTypes';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { Arbeidsgiver } from '../Arbeidsgiver';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';

interface FraværUtenLønn {
    harHattFraværHosArbeidsgiver: YesOrNo.YES;
    arbeidsgiverHarUtbetaltLønn: YesOrNo.NO;
}

export interface ArbeidforholdSøknadsdataHarIkkeHattFravær extends Arbeidsgiver {
    type: 'harIkkeHattFravær';
    harHattFraværHosArbeidsgiver: YesOrNo.NO;
}

export interface ArbeidforholdSøknadsdataHarHattFraværMedLønn extends Arbeidsgiver {
    type: 'harHattFraværMedLønn';
    harHattFraværHosArbeidsgiver: YesOrNo.YES;
    arbeidsgiverHarUtbetaltLønn: YesOrNo.YES;
}

export interface ArbeidforholdSøknadsdataHarHattFraværUtenLønnKonkurs extends Arbeidsgiver, FraværUtenLønn {
    type: 'harHattFraværUtenLønnKonkurs';
    utbetalingsårsak: Utbetalingsårsak.arbeidsgiverKonkurs;
}

export interface ArbeidforholdSøknadsdataHarHattFraværUtenLønnNyOppstartet extends Arbeidsgiver, FraværUtenLønn {
    type: 'harHattFraværUtenLønnNyOppstartet';
    utbetalingsårsak: Utbetalingsårsak.nyoppstartetHosArbeidsgiver;
    årsakNyoppstartet: ÅrsakNyoppstartet;
}

export interface ArbeidforholdSøknadsdataHarHattFraværUtenLønnKonfliktMedArbeidsgiver
    extends Arbeidsgiver,
        FraværUtenLønn {
    type: 'harHattFraværUtenLønnKonfliktMedArbeidsgiver';
    utbetalingsårsak: Utbetalingsårsak.konfliktMedArbeidsgiver;
    konfliktForklaring: string;
    dokumenter: Attachment[];
}

export type ArbeidforholdSøknadsdata =
    | ArbeidforholdSøknadsdataHarIkkeHattFravær
    | ArbeidforholdSøknadsdataHarHattFraværMedLønn
    | ArbeidforholdSøknadsdataHarHattFraværUtenLønnKonkurs
    | ArbeidforholdSøknadsdataHarHattFraværUtenLønnNyOppstartet
    | ArbeidforholdSøknadsdataHarHattFraværUtenLønnKonfliktMedArbeidsgiver;

export type SituasjonSøknadsdata = {
    [organisasjonsnummer: string]: ArbeidforholdSøknadsdata;
};
