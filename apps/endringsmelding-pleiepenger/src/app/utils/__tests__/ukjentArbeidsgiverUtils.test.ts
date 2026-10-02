import { ArbeidsforholdAktivt,ArbeidsgiverMedAnsettelseperioder } from '@app/types';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISODate, ISODate, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';

import {
    getArbeidsaktivitetForUkjentArbeidsforhold,
    getSøknadsperioderForUkjentArbeidsforhold,
} from '../ukjentArbeidsforholdUtils';

describe('ukjentArbeidsforholdUtils', () => {
    describe('getSøknadsperioderForUkjentArbeidsforhold', () => {
        const søknadsperioder: DateRange[] = [
            ISODateRangeToDateRange('2020-01-01/2020-02-01'),
            ISODateRangeToDateRange('2020-05-01/2020-06-01'),
        ];
        it('avgrenser søknadsperioder til ansettelsesperiode med fom og tom', () => {
            const fomIsoDate: ISODate = '2020-01-15';
            const tomIsoDate: ISODate = '2020-05-16';
            const perioder = getSøknadsperioderForUkjentArbeidsforhold(
                søknadsperioder,
                ISODateToDate(fomIsoDate),
                ISODateToDate(tomIsoDate),
            );
            expect(perioder.length).toBe(2);
            expect(dateToISODate(perioder[0].from)).toEqual(fomIsoDate);
            expect(dateToISODate(perioder[0].to)).toEqual('2020-02-01');
            expect(dateToISODate(perioder[1].from)).toEqual('2020-05-01');
            expect(dateToISODate(perioder[1].to)).toEqual(tomIsoDate);
        });
        it('avgrenser søknadsperioder til ansettelsesperiode med bare fom', () => {
            const fomIsoDate: ISODate = '2020-01-15';
            const perioder = getSøknadsperioderForUkjentArbeidsforhold(
                søknadsperioder,
                ISODateToDate(fomIsoDate),
                undefined,
            );
            expect(perioder.length).toBe(2);
            expect(dateToISODate(perioder[0].from)).toEqual(fomIsoDate);
            expect(dateToISODate(perioder[0].to)).toEqual('2020-02-01');
            expect(dateToISODate(perioder[1].from)).toEqual('2020-05-01');
            expect(dateToISODate(perioder[1].to)).toEqual('2020-06-01');
        });
        it('avgrenser søknadsperioder til ansettelsesperiode med bare tom', () => {
            const tomIsoDate: ISODate = '2020-01-15';
            const perioder = getSøknadsperioderForUkjentArbeidsforhold(
                søknadsperioder,
                undefined,
                ISODateToDate(tomIsoDate),
            );
            expect(perioder.length).toBe(1);
            expect(dateToISODate(perioder[0].from)).toEqual('2020-01-01');
            expect(dateToISODate(perioder[0].to)).toEqual(tomIsoDate);
        });
    });

    describe('getArbeidsaktivitetForUkjentArbeidsforhold', () => {
        const søknadsperioder = [ISODateRangeToDateRange('2020-01-01/2020-01-31')];
        const endringsperiode = ISODateRangeToDateRange('2020-01-01/2020-12-31');
        const arbeidsforhold: ArbeidsforholdAktivt = {
            arbeidsgiverKey: 'a_123',
            erAnsatt: true,
            normalarbeidstid: { timerPerUke: { hours: '37', minutes: '30' } },
        };

        const lagArbeidsgiver = (ansettelsesperioder: string[]): ArbeidsgiverMedAnsettelseperioder => ({
            key: 'a_123',
            organisasjonsnummer: '123',
            navn: 'Arbeidsgiver',
            ansettelsesperioder: ansettelsesperioder.map((periode) =>
                ISODateRangeToDateRange(periode as `${string}/${string}`),
            ),
        });

        it('bruker eneste ansettelsesperiode som overlapper søknadsperioden', () => {
            const resultat = getArbeidsaktivitetForUkjentArbeidsforhold(
                søknadsperioder,
                lagArbeidsgiver(['2020-01-01/2020-01-10', '2020-06-01/2020-06-30']),
                arbeidsforhold,
                endringsperiode,
            );

            expect(dateToISODate(resultat.ansettelsesperioderInnenforEndringsperiode[0].from)).toBe('2020-01-01');
            expect(dateToISODate(resultat.ansettelsesperioderInnenforEndringsperiode[0].to)).toBe('2020-01-10');
        });

        it('kaster når flere ansettelsesperioder overlapper søknadsperioden', () => {
            expect(() =>
                getArbeidsaktivitetForUkjentArbeidsforhold(
                    søknadsperioder,
                    lagArbeidsgiver(['2020-01-01/2020-01-10', '2020-01-15/2020-01-31']),
                    arbeidsforhold,
                    endringsperiode,
                ),
            ).toThrow('Ukjent arbeidsforhold kan kun ha en ansettelsesperiode');
        });
    });
});
