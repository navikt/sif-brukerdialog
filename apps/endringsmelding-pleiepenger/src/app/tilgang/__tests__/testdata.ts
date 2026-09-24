import {
    ArbeidsgiverMedAnsettelseperioder,
    K9Sak,
    K9SakArbeidstaker,
    K9SakArbeidstidPeriodeMap,
    UgyldigK9SakFormat,
} from '@app/types';
import { DateRange, ISODateRange, ISODateRangeToDateRange, ISODurationToDuration } from '@navikt/sif-common-utils';

export const periode = (isoDateRange: ISODateRange): DateRange => ISODateRangeToDateRange(isoDateRange);

export const perioder = (...isoDateRanges: ISODateRange[]): DateRange[] => isoDateRanges.map(periode);

const arbeidstidPerioder = (timerPerDag: string, isoDateRange: ISODateRange): K9SakArbeidstidPeriodeMap => ({
    [isoDateRange]: {
        jobberNormaltTimerPerDag: ISODurationToDuration(timerPerDag),
        faktiskArbeidTimerPerDag: ISODurationToDuration(timerPerDag),
    },
});

export const lagArbeidstaker = (organisasjonsnummer: string, timerPerDag = 'PT7H30M'): K9SakArbeidstaker => ({
    organisasjonsnummer,
    arbeidstidInfo: { perioder: arbeidstidPerioder(timerPerDag, '2024-01-01/2024-01-31') },
});

export const lagArbeidsgiver = (
    organisasjonsnummer: string,
    ansettelsesperioder: ISODateRange[],
): ArbeidsgiverMedAnsettelseperioder => ({
    key: `a_${organisasjonsnummer}`,
    navn: `Arbeidsgiver ${organisasjonsnummer}`,
    organisasjonsnummer,
    ansettelsesperioder: perioder(...ansettelsesperioder),
});

interface LagSakOptions {
    søknadsperioder?: ISODateRange[];
    arbeidstakere?: K9SakArbeidstaker[];
    /** Antall timer per dag som SN. 'PT0H0M' betyr at perioden finnes, men uten tid. */
    snTimerPerDag?: string;
    frilansTimerPerDag?: string;
}

export const lagSak = ({
    søknadsperioder = ['2024-01-01/2024-01-31'],
    arbeidstakere = [],
    snTimerPerDag,
    frilansTimerPerDag,
}: LagSakOptions = {}): K9Sak =>
    ({
        søknadId: 'sak-1',
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            søknadsperioder: perioder(...søknadsperioder),
            arbeidstid: {
                arbeidstakerList: arbeidstakere,
                selvstendigNæringsdrivendeArbeidstidInfo: snTimerPerDag
                    ? { perioder: arbeidstidPerioder(snTimerPerDag, '2024-01-01/2024-01-31') }
                    : undefined,
                frilanserArbeidstidInfo: frilansTimerPerDag
                    ? { perioder: arbeidstidPerioder(frilansTimerPerDag, '2024-01-01/2024-01-31') }
                    : undefined,
            },
        },
    }) as K9Sak;

export const ugyldigSak: UgyldigK9SakFormat = {
    erUgyldigK9SakFormat: true,
    detaljer: { ugyldigeFelt: ['barn.fornavn'] },
};
