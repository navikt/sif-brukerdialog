import { datePickerUtils } from './datePickerUtils';

describe('datePickerUtils', () => {
    const originalTZ = process.env.TZ;

    beforeAll(() => {
        process.env.TZ = 'Europe/Oslo';
    });

    afterAll(() => {
        process.env.TZ = originalTZ;
    });

    it('serialiserer valgt kalenderdato til ISO-format', () => {
        const selectedDate = new Date(2026, 3, 2);

        expect(datePickerUtils.dateToISODateString(selectedDate)).toBe('2026-04-02');
    });

    it('kombinerer helger og eksplisitt deaktiverte ukedager', () => {
        expect(
            datePickerUtils.getDisabledDates({
                disableWeekends: true,
                disabledDaysOfWeek: 3,
            }),
        ).toContainEqual({ dayOfWeek: [0, 6, 3] });
    });
});
