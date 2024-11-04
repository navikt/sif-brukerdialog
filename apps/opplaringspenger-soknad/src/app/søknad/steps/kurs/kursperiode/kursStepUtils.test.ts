import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateRangeUtils, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig } from '../kursStepUtils';

describe('kursStepUtils', () => {
    describe('getPerioderISøknadsperiodeInstitusjonIkkeErGyldig', () => {
        const tillattSøknadsperiode: DateRange = {
            from: new Date('2020-01-01'),
            to: new Date('2020-04-01'),
        };
        const gyldigePerioder: DateRange[] = [
            ISODateRangeToDateRange('2020-01-01/2020-02-01'),
            ISODateRangeToDateRange('2020-03-01/2020-04-01'),
        ];
        it('returnerer perioden for en måned hvor institusjon ikke er gyldig', () => {
            const result = getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig(
                gyldigePerioder,
                tillattSøknadsperiode,
            );
            expect(result.length).toEqual(1);
            expect(dateRangeUtils.dateRangeToISODateRange(result[0])).toEqual('2020-02-02/2020-02-29');
        });
        it('returnerer ugyldig periode hvis gyldig periode starter etter maks tillatt søknadsperiode', () => {
            const result = getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig(gyldigePerioder, {
                ...tillattSøknadsperiode,
                from: new Date('2019-01-12'),
            });
            expect(result.length).toEqual(2);
            expect(dateRangeUtils.dateRangeToISODateRange(result[0])).toEqual('2019-01-12/2019-12-31');
            expect(dateRangeUtils.dateRangeToISODateRange(result[1])).toEqual('2020-02-02/2020-02-29');
        });
        it('returnerer ugyldig periode hvis gyldig periode slutter før tillatt søknadsperiode slutter', () => {
            const result = getPerioderISøknadsperiodeHvorInstitusjonIkkeErGyldig(gyldigePerioder, {
                ...tillattSøknadsperiode,
                to: new Date('2020-05-01'),
            });
            expect(result.length).toEqual(2);
            expect(dateRangeUtils.dateRangeToISODateRange(result[0])).toEqual('2020-02-02/2020-02-29');
            expect(dateRangeUtils.dateRangeToISODateRange(result[1])).toEqual('2020-04-02/2020-05-01');
        });
    });
});
