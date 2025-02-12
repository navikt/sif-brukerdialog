import getTimeValidator, { ValidateTimeError } from '../getTimeValidator';
import { InputTime } from '../types';

const zeroTime: InputTime = {
    hours: '0',
    minutes: '0',
};

describe(`validateTime`, () => {
    it(`returns undefined when not required and value is empty`, () => {
        expect(getTimeValidator({ required: false })('')).toBeUndefined();
    });
    it(`returns undefined when hours and minutes have valid value`, () => {
        expect(getTimeValidator({ required: true })({ ...zeroTime, minutes: '1' })).toBeUndefined();
        expect(getTimeValidator({ required: true })({ ...zeroTime, hours: '1' })).toBeUndefined();
    });
    it(`returns undefined when hours are 24 and minutes are 0 or empty`, () => {
        expect(
            getTimeValidator({ required: true, max: { hours: 24, minutes: 0 } })({ ...zeroTime, hours: '24' }),
        ).toBeUndefined();
        expect(
            getTimeValidator({ required: true, max: { hours: 24, minutes: 0 } })({
                ...zeroTime,
                hours: '24',
                minutes: '0',
            }),
        ).toBeUndefined();
    });
    it(`returns ${ValidateTimeError.timeHasNoValue} when required and time is undefined`, () => {
        expect(getTimeValidator({ required: true })(undefined)).toEqual(ValidateTimeError.timeHasNoValue);
    });
    it(`returns ${ValidateTimeError.timeHasNoValue} when required and hours and minutes are empty values`, () => {
        expect(getTimeValidator({ required: true })({ hours: '', minutes: '' })).toEqual(
            ValidateTimeError.timeHasNoValue,
        );
    });
    it(`returns undefined when required and hours and minutes are both 0`, () => {
        expect(getTimeValidator({ required: true })(zeroTime)).toBeUndefined();
    });
    it(`returns ${ValidateTimeError.hoursAreNegative} when value for hours are negative`, () => {
        expect(getTimeValidator({ required: true })({ hours: '-1' })).toEqual(ValidateTimeError.hoursAreNegative);
    });
    it(`returns ${ValidateTimeError.minutesAreNegative} when value for minutes are negative`, () => {
        expect(getTimeValidator({ required: true })({ minutes: '-1' })).toEqual(ValidateTimeError.minutesAreNegative);
    });
    it(`returns ${ValidateTimeError.hoursAreInvalid} when hours has invalid value`, () => {
        expect(getTimeValidator()({ hours: 'x' })).toEqual(ValidateTimeError.hoursAreInvalid);
        expect(getTimeValidator()({ hours: 'x', minutes: '2' })).toEqual(ValidateTimeError.hoursAreInvalid);
        expect(getTimeValidator()({ hours: '1.', minutes: '2' })).toEqual(ValidateTimeError.hoursAreInvalid);
        expect(getTimeValidator()({ hours: ',1', minutes: '2' })).toEqual(ValidateTimeError.hoursAreInvalid);
    });
    it(`returns ${ValidateTimeError.minutesAreInvalid} when hours has invalid value`, () => {
        expect(getTimeValidator()({ minutes: 'x' })).toEqual(ValidateTimeError.minutesAreInvalid);
        expect(getTimeValidator()({ minutes: 'x', hours: '2' })).toEqual(ValidateTimeError.minutesAreInvalid);
        expect(getTimeValidator()({ minutes: '.2', hours: '2' })).toEqual(ValidateTimeError.minutesAreInvalid);
        expect(getTimeValidator()({ minutes: '2.', hours: '2' })).toEqual(ValidateTimeError.minutesAreInvalid);
        expect(getTimeValidator()({ minutes: '2,', hours: '2' })).toEqual(ValidateTimeError.minutesAreInvalid);
    });
    it(`returns ${ValidateTimeError.tooManyHours} when hours are more than 24 hours`, () => {
        expect(getTimeValidator()({ hours: '25' })).toEqual(ValidateTimeError.tooManyHours);
    });
    it(`returns ${ValidateTimeError.tooManyMinutes} when hours are more than 59 minutes`, () => {
        expect(getTimeValidator()({ minutes: '60' })).toEqual(ValidateTimeError.tooManyMinutes);
    });
    it(`returns ${ValidateTimeError.durationIsTooLong} when hours and minutes are more than max duration`, () => {
        expect(getTimeValidator({ max: { hours: 5, minutes: 0 } })({ hours: '5', minutes: '1' })).toEqual(
            ValidateTimeError.durationIsTooLong,
        );
        expect(getTimeValidator({ max: { hours: 0, minutes: 10 } })({ hours: '0', minutes: '11' })).toEqual(
            ValidateTimeError.durationIsTooLong,
        );
        expect(getTimeValidator({ max: { hours: 5, minutes: 0 } })({ hours: '5', minutes: '0' })).toBeUndefined();
    });
    it(`returns ${ValidateTimeError.durationIsTooShort} when hours and minutes are more than max duration`, () => {
        expect(getTimeValidator({ min: { hours: 5, minutes: 0 } })({ hours: '4', minutes: '59' })).toEqual(
            ValidateTimeError.durationIsTooShort,
        );
        expect(getTimeValidator({ min: { hours: 0, minutes: 10 } })({ hours: '0', minutes: '09' })).toEqual(
            ValidateTimeError.durationIsTooShort,
        );
        expect(getTimeValidator({ min: { hours: 0, minutes: 10 } })({ hours: '0', minutes: '10' })).toBeUndefined();
    });
});
