import { decimalTimeToTime, timeToDecimalTime, timeToIso8601Duration } from '../timeUtils';

describe('timeUtils', () => {
    it('should convert decimal hours to Time', () => {
        expect(decimalTimeToTime(1.5)).toEqual({
            hours: '1',
            minutes: '30',
        });
        expect(decimalTimeToTime(1.75)).toEqual({
            hours: '1',
            minutes: '45',
        });
    });

    it('should convert time to decimal time', () => {
        expect(timeToDecimalTime({ hours: '37', minutes: '30' })).toBe(37.5);
        expect(timeToDecimalTime({ hours: '0', minutes: '30' })).toBe(0.5);
    });

    it('should format time in Iso8601Duration format', () => {
        expect(timeToIso8601Duration({ hours: '10', minutes: '0' })).toEqual('PT10H0M');
        expect(timeToIso8601Duration({ hours: '0', minutes: '45' })).toEqual('PT0H45M');
    });
});
