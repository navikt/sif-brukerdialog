import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';

export enum Utbetalingsårsak {
    nyoppstartetHosArbeidsgiver = 'NYOPPSTARTET_HOS_ARBEIDSGIVER',
    arbeidsgiverKonkurs = 'ARBEIDSGIVER_KONKURS',
    konfliktMedArbeidsgiver = 'KONFLIKT_MED_ARBEIDSGIVER',
    ikkeBesvart = 'IKKE_BESVART',
}

export enum ÅrsakNyoppstartet {
    jobbetHosAnnenArbeidsgiver = 'JOBBET_HOS_ANNEN_ARBEIDSGIVER',
    varFrilanser = 'VAR_FRILANSER',
    varSelvstendige = 'VAR_SELVSTENDIGE',
    søkteAndreUtbetalinger = 'SØKTE_ANDRE_UTBETALINGER',
    arbeidIUtlandet = 'ARBEID_I_UTLANDET',
    utøvdeVerneplikt = 'UTØVDE_VERNEPLIKT',
    annet = 'ANNET',
}

export type Arbeidsforhold = {
    navn: string;
    organisasjonsnummer: string;
    harHattFraværHosArbeidsgiver: YesOrNo;
    arbeidsgiverHarUtbetaltLønn: YesOrNo;
    utbetalingsårsak: Utbetalingsårsak;
    årsakNyoppstartet?: ÅrsakNyoppstartet;
    konfliktForklaring?: string;
    dokumenter: Attachment[];
};
