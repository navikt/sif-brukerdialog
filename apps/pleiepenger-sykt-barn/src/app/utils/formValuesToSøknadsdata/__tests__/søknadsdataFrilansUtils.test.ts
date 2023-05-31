import { dateToISODate, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import * as erFrilanserITidsromMock from '../../frilanserUtils';
import { getPeriodeSomFrilanserInnenforSøknadsperiode } from '../../frilanserUtils';

const søknadsperiode = ISODateRangeToDateRange('2022-01-01/2022-02-01');
const datoFørSøknadsperiode = dayjs(søknadsperiode.from).subtract(1, 'day').toDate();
const datoISøknadsperiode = dayjs(søknadsperiode.from).add(2, 'day').toDate();

const datoEtterSøknadsperiode = dayjs(søknadsperiode.to).add(1, 'day').toDate();
const frilansTidsromSpy = jest.spyOn(erFrilanserITidsromMock, 'erFrilanserITidsrom');

describe('getPeriodeSomFrilanserInnenforSøknadsperiode', () => {
    it('returnerer undefined dersom en ikke er frilanser i søknadsperiode', () => {
        frilansTidsromSpy.mockReturnValue(false);
        const result = getPeriodeSomFrilanserInnenforSøknadsperiode(
            søknadsperiode,
            datoFørSøknadsperiode,
            datoFørSøknadsperiode
        );
        expect(result).toBeFalsy();
    });
    it('returnerer defined dersom en er frilanser i søknadsperiode', () => {
        frilansTidsromSpy.mockReturnValue(true);
        const result = getPeriodeSomFrilanserInnenforSøknadsperiode(
            søknadsperiode,
            datoFørSøknadsperiode,
            datoEtterSøknadsperiode
        );
        expect(result).toBeDefined();
    });
    it('returnerer søknadsperioden dersom bruker startet som frilanser før søknadsperiode og er fortsatt frilanser', () => {
        const result = getPeriodeSomFrilanserInnenforSøknadsperiode(søknadsperiode, datoFørSøknadsperiode);
        expect(result).toBeDefined();
        if (result) {
            expect(dateToISODate(result?.from)).toEqual(dateToISODate(søknadsperiode.from));
            expect(dateToISODate(result?.to)).toEqual(dateToISODate(søknadsperiode.to));
        }
    });
    it('returnerer avkortet periode dersom bruker startet som frilanser i søknadsperiode og er fortsatt frilanser', () => {
        const result = getPeriodeSomFrilanserInnenforSøknadsperiode(søknadsperiode, datoISøknadsperiode);
        expect(result).toBeDefined();
        if (result) {
            expect(dateToISODate(result.from)).toEqual(dateToISODate(datoISøknadsperiode));
            expect(dateToISODate(result.to)).toEqual(dateToISODate(søknadsperiode.to));
        }
    });
});
