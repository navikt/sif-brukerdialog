import dayjs from 'dayjs';
import { getNMonthsAgo, getSituasjonStepInitialValues } from '../SituasjonStepUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SituasjonSøknadsdata, Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import { Utbetalingsårsak, ÅrsakNyoppstartet } from '../../../../types/ArbeidsforholdTypes';

describe('getNMonthsAgo', () => {
    it('returns the correct date', () => {
        const numberOfMonths = 3;
        const result = getNMonthsAgo(numberOfMonths);

        const expectedDate = dayjs().subtract(numberOfMonths, 'month').startOf('month').toDate();

        expect(result).toEqual(expectedDate);
    });
});

describe('getSituasjonStepInitialValues', () => {
    it('should return default values when no data is provided', () => {
        const søknadsdata = { situasjon: {} };
        const arbeidsgivere = [];
        const initialValues = getSituasjonStepInitialValues(søknadsdata, arbeidsgivere);

        expect(initialValues.arbeidsforhold).toHaveLength(0);
    });

    it('should map arbeidsgivere with default values based on provided data', () => {
        const arbeidsgivere = [
            {
                navn: 'Arbeidsgiver 1',
                organisasjonsnummer: '123456789',
            },
            {
                navn: 'Arbeidsgiver 2',
                organisasjonsnummer: '987654321',
            },
        ];

        const situasjon: SituasjonSøknadsdata = {
            '123456789': {
                ...arbeidsgivere[0],
                type: 'harIkkeHattFravær',
                harHattFraværHosArbeidsgiver: YesOrNo.NO,
            },
            '987654321': {
                ...arbeidsgivere[1],
                type: 'harHattFraværMedLønn',
                harHattFraværHosArbeidsgiver: YesOrNo.YES,
                arbeidsgiverHarUtbetaltLønn: YesOrNo.YES,
            },
        };

        const søknadsdata: Søknadsdata = { situasjon: situasjon };
        const initialValues = getSituasjonStepInitialValues(søknadsdata, arbeidsgivere);

        expect(initialValues.arbeidsforhold).toHaveLength(2);
        expect(initialValues.arbeidsforhold[0].harHattFraværHosArbeidsgiver).toBe(YesOrNo.NO);
        expect(initialValues.arbeidsforhold[0].arbeidsgiverHarUtbetaltLønn).toBe(YesOrNo.UNANSWERED);
        expect(initialValues.arbeidsforhold[1].harHattFraværHosArbeidsgiver).toBe(YesOrNo.YES);
        expect(initialValues.arbeidsforhold[1].arbeidsgiverHarUtbetaltLønn).toBe(YesOrNo.YES);
    });

    it('should set default values when no specific data is available for a given arbeidsgiver', () => {
        const arbeidsgivere = [
            {
                navn: 'Arbeidsgiver 1',
                organisasjonsnummer: '123456789',
            },
        ];

        const situasjon = {
            // No data for the arbeidsgiver
        };

        const søknadsdata = { situasjon };
        const initialValues = getSituasjonStepInitialValues(søknadsdata, arbeidsgivere);

        expect(initialValues.arbeidsforhold).toHaveLength(1);
        expect(initialValues.arbeidsforhold[0].harHattFraværHosArbeidsgiver).toBe(YesOrNo.UNANSWERED);
        expect(initialValues.arbeidsforhold[0].arbeidsgiverHarUtbetaltLønn).toBe(YesOrNo.UNANSWERED);
    });

    it('should handle different types of fravær and utbetalingsårsak', () => {
        const arbeidsgivere = [
            {
                navn: 'Arbeidsgiver 1',
                organisasjonsnummer: '123456789',
            },
        ];

        const situasjon: SituasjonSøknadsdata = {
            '123456789': {
                ...arbeidsgivere[0],
                type: 'harHattFraværUtenLønnKonkurs',
                utbetalingsårsak: Utbetalingsårsak.arbeidsgiverKonkurs,
                harHattFraværHosArbeidsgiver: YesOrNo.YES,
                arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
            },
        };

        const søknadsdata = { situasjon };
        const initialValues = getSituasjonStepInitialValues(søknadsdata, arbeidsgivere);

        expect(initialValues.arbeidsforhold).toHaveLength(1);
        expect(initialValues.arbeidsforhold[0].utbetalingsårsak).toBe(Utbetalingsårsak.arbeidsgiverKonkurs);
    });

    it('should handle different types of arbeidsgivere', () => {
        const arbeidsgivere = [
            {
                navn: 'Arbeidsgiver 1',
                organisasjonsnummer: '123456789',
            },
            {
                navn: 'Arbeidsgiver 2',
                organisasjonsnummer: '987654321',
            },
        ];

        const situasjon: SituasjonSøknadsdata = {
            '123456789': {
                ...arbeidsgivere[0],
                type: 'harHattFraværUtenLønnNyOppstartet',
                harHattFraværHosArbeidsgiver: YesOrNo.YES,
                arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
                utbetalingsårsak: Utbetalingsårsak.nyoppstartetHosArbeidsgiver,
                årsakNyoppstartet: ÅrsakNyoppstartet.annet,
            },
            '987654321': {
                ...arbeidsgivere[1],
                type: 'harHattFraværUtenLønnKonfliktMedArbeidsgiver',
                harHattFraværHosArbeidsgiver: YesOrNo.YES,
                arbeidsgiverHarUtbetaltLønn: YesOrNo.NO,
                utbetalingsårsak: Utbetalingsårsak.konfliktMedArbeidsgiver,
                konfliktForklaring: 'Some explanation',
                dokumenter: [],
            },
        };

        const søknadsdata = { situasjon };
        const initialValues = getSituasjonStepInitialValues(søknadsdata, arbeidsgivere);

        expect(initialValues.arbeidsforhold).toHaveLength(2);

        // Assert for arbeidsgiver 1
        expect(initialValues.arbeidsforhold[0].utbetalingsårsak).toBe(Utbetalingsårsak.nyoppstartetHosArbeidsgiver);
        expect(initialValues.arbeidsforhold[0].årsakNyoppstartet).toBe(ÅrsakNyoppstartet.annet);

        // Assert for arbeidsgiver 2
        expect(initialValues.arbeidsforhold[1].utbetalingsårsak).toBe(Utbetalingsårsak.konfliktMedArbeidsgiver);
        expect(initialValues.arbeidsforhold[1].konfliktForklaring).toBe('Some explanation');
        expect(initialValues.arbeidsforhold[1].dokumenter).toHaveLength(0);
    });

    it('should handle missing information gracefully', () => {
        const arbeidsgivere = [
            {
                navn: 'Arbeidsgiver 1',
                organisasjonsnummer: '123456789',
            },
        ];

        const situasjon: SituasjonSøknadsdata = {
            '123456789': {
                ...arbeidsgivere[0],
                type: 'harIkkeHattFravær',
                harHattFraværHosArbeidsgiver: YesOrNo.NO,
            },
        };

        const søknadsdata = { situasjon };
        const initialValues = getSituasjonStepInitialValues(søknadsdata, arbeidsgivere);

        expect(initialValues.arbeidsforhold).toHaveLength(1);
        expect(initialValues.arbeidsforhold[0].utbetalingsårsak).toBe(Utbetalingsårsak.ikkeBesvart);
        expect(initialValues.arbeidsforhold[0].harHattFraværHosArbeidsgiver).toBe(YesOrNo.NO);
    });
});
