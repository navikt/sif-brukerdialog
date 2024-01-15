import { ApiAktivitet, ArbeidsgiverDetaljer, Utbetalingsperiode } from '../../types/søknadApiData/SøknadApiData';
import { FraværSøknadsdata } from '../../types/søknadsdata/FraværSøknadsdata';
import { SituasjonSøknadsdata } from '../../types/søknadsdata/SituasjonSøknadsdata';
import { Utbetalingsårsak } from '../../types/ArbeidsforholdTypes';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/src/forms/fravær/types';
import { dateToISODate, decimalTimeToTime, timeToIso8601Duration } from '@navikt/sif-common-utils/src';
import { getOrganisasjonsnummerFromKey } from '../../søknad/steps/fravær/fraværStepUtils';

export const getArbeidsgivereApiDataFromSøknadsdata = (
    situasjon: SituasjonSøknadsdata,
    fravær: FraværSøknadsdata,
): ArbeidsgiverDetaljer[] => {
    const arbeidsgiverDetaljer: ArbeidsgiverDetaljer[] = [];

    Object.entries(fravær.fravær).forEach(([key, value]) => {
        const organisasjonsnummer = getOrganisasjonsnummerFromKey(key);
        const arbeidsforhold = situasjon[organisasjonsnummer];

        const { type } = value;

        const fraværPerioder =
            type === 'harFulltOgDelvisFravær' || type === 'harKunFulltFravær' ? value.fraværPerioder : [];
        const fraværDager = type === 'harFulltOgDelvisFravær' || type === 'harKunDelvisFravær' ? value.fraværDager : [];

        const harFraværDagerEllerPerioder = fraværPerioder.length > 0 || fraværDager.length > 0;

        if (
            arbeidsforhold &&
            (arbeidsforhold.type === 'harHattFraværUtenLønnKonfliktMedArbeidsgiver' ||
                arbeidsforhold.type === 'harHattFraværUtenLønnKonkurs' ||
                arbeidsforhold.type === 'harHattFraværUtenLønnNyOppstartet') &&
            harFraværDagerEllerPerioder
        ) {
            arbeidsgiverDetaljer.push({
                navn: arbeidsforhold.navn,
                organisasjonsnummer: arbeidsforhold.organisasjonsnummer,
                harHattFraværHosArbeidsgiver: true,
                arbeidsgiverHarUtbetaltLønn: false,
                utbetalingsårsak: arbeidsforhold.utbetalingsårsak,
                årsakNyoppstartet:
                    arbeidsforhold.utbetalingsårsak === Utbetalingsårsak.nyoppstartetHosArbeidsgiver &&
                    arbeidsforhold.årsakNyoppstartet
                        ? arbeidsforhold.årsakNyoppstartet
                        : undefined,
                konfliktForklaring:
                    arbeidsforhold.utbetalingsårsak === Utbetalingsårsak.konfliktMedArbeidsgiver &&
                    arbeidsforhold.konfliktForklaring
                        ? arbeidsforhold.konfliktForklaring
                        : undefined,
                perioder: mapFraværTilUtbetalingsperiode(fraværPerioder, fraværDager),
            });
        }
    });
    return arbeidsgiverDetaljer;
};

export const mapFraværTilUtbetalingsperiode = (
    fraværPerioder: FraværPeriode[],
    fraværDager: FraværDag[],
): Utbetalingsperiode[] => {
    const periodeMappedTilUtbetalingsperiode: Utbetalingsperiode[] = fraværPerioder.map(
        (periode: FraværPeriode): Utbetalingsperiode => {
            return {
                fraOgMed: dateToISODate(periode.fraOgMed),
                tilOgMed: dateToISODate(periode.tilOgMed),
                antallTimerPlanlagt: null,
                antallTimerBorte: null,
                årsak: 'ORDINÆRT_FRAVÆR',
                aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
            };
        },
    );

    const fraværDeleravDagMappedTilUtbetalingsperiode: Utbetalingsperiode[] = fraværDager.map(
        (fravær: FraværDag): Utbetalingsperiode => {
            const utbetalingsperiode = {
                fraOgMed: dateToISODate(fravær.dato),
                tilOgMed: dateToISODate(fravær.dato),
                antallTimerPlanlagt: timeToIso8601Duration(decimalTimeToTime(parseFloat(fravær.timerArbeidsdag))),
                antallTimerBorte: timeToIso8601Duration(decimalTimeToTime(parseFloat(fravær.timerFravær))),
                årsak: 'ORDINÆRT_FRAVÆR',
                aktivitetFravær: [ApiAktivitet.ARBEIDSTAKER],
            };
            return utbetalingsperiode;
        },
    );

    return [...periodeMappedTilUtbetalingsperiode, ...fraværDeleravDagMappedTilUtbetalingsperiode];
};
