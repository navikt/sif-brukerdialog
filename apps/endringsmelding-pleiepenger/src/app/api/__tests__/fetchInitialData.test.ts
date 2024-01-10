import { ISODateRangeToDateRange, dateToISODate } from '@navikt/sif-common-utils';
import { getPeriodeForArbeidsgiverOppslag } from '../../utils/initialDataUtils';

describe('getPeriodeForArbeidsgiverOppslag', () => {
    const endringsperiode = ISODateRangeToDateRange('2022-05-01/2022-10-01');

    it('returnerer minste dateRange ut fra maks endringsperiode og samletSøknadsperiode', () => {
        const samletSøknadsperiode = ISODateRangeToDateRange('2022-06-01/2022-09-01');
        const result = getPeriodeForArbeidsgiverOppslag(samletSøknadsperiode, endringsperiode);
        expect(result).toBeDefined();
        if (result) {
            expect(dateToISODate(result.from)).toEqual('2022-06-01');
            expect(dateToISODate(result.to)).toEqual('2022-09-01');
        }
    });
    it('returnerer endringsperiode hvis samletSøknadsperiode går utover endringsperiode', () => {
        const samletSøknadsperiode = ISODateRangeToDateRange('2021-01-01/2023-01-01');
        const result = getPeriodeForArbeidsgiverOppslag(samletSøknadsperiode, endringsperiode);
        expect(result).toBeDefined();
        if (result) {
            expect(dateToISODate(result.from)).toEqual('2022-05-01');
            expect(dateToISODate(result.to)).toEqual('2022-10-01');
        }
    });
});
