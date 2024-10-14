import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';
import dayjs from 'dayjs';
import { Arbeidsforhold, Utbetalingsårsak } from '../../../types/ArbeidsforholdTypes';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidforholdSøknadsdata, SituasjonSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import appSentryLogger from '../../../utils/appSentryLogger';
import { SituasjonFormValues } from './SituasjonStep';

export const getNMonthsAgo = (numberOfMonths: number) => {
    return dayjs().subtract(numberOfMonths, 'month').startOf('month').toDate();
};

const getForholdSøknadsdata = (forhold: Arbeidsforhold): ArbeidforholdSøknadsdata | undefined => {
    const {
        organisasjonsnummer,
        navn,
        harHattFraværHosArbeidsgiver,
        arbeidsgiverHarUtbetaltLønn,
        utbetalingsårsak,
        konfliktForklaring,
        årsakNyoppstartet,
        dokumenter,
    } = forhold;

    if (harHattFraværHosArbeidsgiver !== YesOrNo.YES) {
        return {
            type: 'harIkkeHattFravær',
            navn,
            organisasjonsnummer,
            harHattFraværHosArbeidsgiver: YesOrNo.NO,
        };
    } else {
        if (arbeidsgiverHarUtbetaltLønn === YesOrNo.YES) {
            return {
                type: 'harHattFraværMedLønn',
                navn,
                organisasjonsnummer,
                harHattFraværHosArbeidsgiver: YesOrNo.YES,
                arbeidsgiverHarUtbetaltLønn: YesOrNo.YES,
            };
        } else {
            switch (utbetalingsårsak) {
                case Utbetalingsårsak.arbeidsgiverKonkurs:
                    return {
                        type: 'harHattFraværUtenLønnKonkurs',
                        navn,
                        organisasjonsnummer,
                        harHattFraværHosArbeidsgiver: YesOrNo.YES,
                        arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
                        utbetalingsårsak: Utbetalingsårsak.arbeidsgiverKonkurs,
                    };

                case Utbetalingsårsak.nyoppstartetHosArbeidsgiver:
                    if (!årsakNyoppstartet) {
                        appSentryLogger.logError(
                            'getForholdSøknadsdata: Utbetalingsårsak.nyoppstartetHosArbeidsgiver, årsakNyoppstartet === undefined ',
                        );
                        return undefined;
                    }
                    return {
                        type: 'harHattFraværUtenLønnNyOppstartet',
                        navn,
                        organisasjonsnummer,
                        harHattFraværHosArbeidsgiver: YesOrNo.YES,
                        arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
                        utbetalingsårsak: Utbetalingsårsak.nyoppstartetHosArbeidsgiver,
                        årsakNyoppstartet,
                    };

                case Utbetalingsårsak.konfliktMedArbeidsgiver:
                    if (!konfliktForklaring) {
                        appSentryLogger.logError(
                            'getForholdSøknadsdata: Utbetalingsårsak.konfliktMedArbeidsgiver, konfliktForklaring === undefined ',
                        );
                        return undefined;
                    }
                    return {
                        type: 'harHattFraværUtenLønnKonfliktMedArbeidsgiver',
                        navn,
                        organisasjonsnummer,
                        harHattFraværHosArbeidsgiver: YesOrNo.YES,
                        arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
                        utbetalingsårsak: Utbetalingsårsak.konfliktMedArbeidsgiver,
                        konfliktForklaring,
                        dokumenter,
                    };
            }
        }
    }
};

export const getSituasjonSøknadsdataFromFormValues = (
    values: SituasjonFormValues,
): SituasjonSøknadsdata | undefined => {
    const { arbeidsforhold } = values;

    if (!arbeidsforhold || arbeidsforhold.length === 0) {
        appSentryLogger.logError(
            'getSituasjonSøknadsdataFromFormValues: !arbeidsforhold || arbeidsforhold.length === 0',
        );
        return undefined;
    }

    const situasjonSøknadsdataMap: SituasjonSøknadsdata = {};

    arbeidsforhold.forEach((forhold) => {
        const forholdSøknadsdata = getForholdSøknadsdata(forhold);
        if (forholdSøknadsdata) {
            situasjonSøknadsdataMap[forhold.organisasjonsnummer] = forholdSøknadsdata;
        }
    });

    return Object.keys(situasjonSøknadsdataMap).length > 0 ? situasjonSøknadsdataMap : undefined;
};

const getDefaultForhold = (forhold?: ArbeidforholdSøknadsdata) => {
    const defaultForhold = {
        harHattFraværHosArbeidsgiver: YesOrNo.UNANSWERED,
        arbeidsgiverHarUtbetaltLønn: YesOrNo.UNANSWERED,
        utbetalingsårsak: Utbetalingsårsak.ikkeBesvart,
        årsakNyoppstartet: undefined,
        konfliktForklaring: undefined,
        dokumenter: [],
    };

    if (!forhold) {
        return defaultForhold;
    }

    switch (forhold.type) {
        case 'harIkkeHattFravær':
            return {
                ...defaultForhold,
                harHattFraværHosArbeidsgiver: forhold.harHattFraværHosArbeidsgiver,
            };
        case 'harHattFraværMedLønn':
            return {
                ...defaultForhold,
                harHattFraværHosArbeidsgiver: forhold.harHattFraværHosArbeidsgiver,
                arbeidsgiverHarUtbetaltLønn: forhold.arbeidsgiverHarUtbetaltLønn,
            };
        case 'harHattFraværUtenLønnKonkurs':
            return {
                ...defaultForhold,
                harHattFraværHosArbeidsgiver: forhold.harHattFraværHosArbeidsgiver,
                arbeidsgiverHarUtbetaltLønn: forhold.arbeidsgiverHarUtbetaltLønn,
                utbetalingsårsak: forhold.utbetalingsårsak,
            };
        case 'harHattFraværUtenLønnNyOppstartet':
            return {
                ...defaultForhold,
                harHattFraværHosArbeidsgiver: forhold.harHattFraværHosArbeidsgiver,
                arbeidsgiverHarUtbetaltLønn: forhold.arbeidsgiverHarUtbetaltLønn,
                utbetalingsårsak: forhold.utbetalingsårsak,
                årsakNyoppstartet: forhold.årsakNyoppstartet,
            };
        case 'harHattFraværUtenLønnKonfliktMedArbeidsgiver':
            return {
                ...defaultForhold,
                harHattFraværHosArbeidsgiver: forhold.harHattFraværHosArbeidsgiver,
                arbeidsgiverHarUtbetaltLønn: forhold.arbeidsgiverHarUtbetaltLønn,
                utbetalingsårsak: forhold.utbetalingsårsak,
                konfliktForklaring: forhold.konfliktForklaring,
                dokumenter: forhold.dokumenter,
            };
        default:
            return defaultForhold;
    }
};

export const getSituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    arbeidsgivere: Arbeidsgiver[],
): SituasjonFormValues => {
    const { situasjon } = søknadsdata;

    const arbeidsforhold = arbeidsgivere.map((arbeidsgiver) => {
        const forhold = situasjon ? situasjon[arbeidsgiver.organisasjonsnummer] : undefined;

        return {
            ...arbeidsgiver,
            ...getDefaultForhold(forhold),
        };
    });

    return { arbeidsforhold };
};

export const valuesToAlleDokumenterISøknaden = (arbeidsforhold: Arbeidsforhold[]): Attachment[] => [
    ...arbeidsforhold.map((a) => a.dokumenter).flat(),
    //TODO ENDRE NAVN, LEGG til Legeelklaring
];
