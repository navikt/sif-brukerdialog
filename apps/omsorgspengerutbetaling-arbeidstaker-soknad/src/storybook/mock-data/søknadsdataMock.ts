import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { Søknadsdata } from '../../app/types/søknadsdata/Søknadsdata';
import { Utbetalingsårsak, ÅrsakNyoppstartet } from '../../app/types/ArbeidsforholdTypes';

export const søknadsdataMock: Søknadsdata = {
    id: '918f8ced-f7b3-4404-b708-ba7615f07e2d',
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
    dineBarn: {
        harDeltBosted: false,
        andreBarn: [],
    },
    situasjon: {
        '123451234': {
            type: 'harHattFraværUtenLønnNyOppstartet',
            navn: 'Arbeids- og velferdsetaten',
            organisasjonsnummer: '123451234',
            harHattFraværHosArbeidsgiver: YesOrNo.YES,
            arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
            utbetalingsårsak: Utbetalingsårsak.nyoppstartetHosArbeidsgiver,
            årsakNyoppstartet: ÅrsakNyoppstartet.varFrilanser,
        },
        '123451235': {
            type: 'harHattFraværUtenLønnKonkurs',
            navn: 'Arbeids- og sosialdepartementet',
            organisasjonsnummer: '123451235',
            harHattFraværHosArbeidsgiver: YesOrNo.YES,
            arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
            utbetalingsårsak: Utbetalingsårsak.arbeidsgiverKonkurs,
        },
    },
    fravær: {
        fravær: {
            key_123451234: {
                type: 'harKunFulltFravær',
                harPerioderMedFravær: YesOrNo.YES,
                fraværPerioder: [
                    {
                        id: '457234d6-b56b-4af6-9c2d-80f7b6c48e90',
                        fraOgMed: new Date('2024-04-08T00:00:00.000Z'),
                        tilOgMed: new Date('2024-04-26T00:00:00.000Z'),
                    },
                ],
                harDagerMedDelvisFravær: YesOrNo.NO,
            },
            key_123451235: {
                type: 'harKunDelvisFravær',
                harPerioderMedFravær: YesOrNo.NO,
                harDagerMedDelvisFravær: YesOrNo.YES,
                fraværDager: [
                    {
                        id: '453e44a1-991f-487a-a7ca-0d80ddabaacb',
                        timerArbeidsdag: '4',
                        timerFravær: '1',
                        dato: new Date('2024-04-22T00:00:00.000Z'),
                    },
                ],
            },
        },
        perioderHarVærtIUtlandet: YesOrNo.NO,
        perioderUtenlandsopphold: [],
    },
    legeerklæring: {
        vedlegg: [],
    },
    medlemskap: {
        type: 'harIkkeBoddSkalIkkeBo',
        harBoddUtenforNorgeSiste12Mnd: false,
        skalBoUtenforNorgeNeste12Mnd: false,
    },
};
