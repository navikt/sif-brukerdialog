import { ISODateToDate } from '..';
import { dateFormatter } from '../dateFormatter';

describe('dateFormatter', () => {
    const date = ISODateToDate('2021-01-01');
    it('formats compact', () => {
        expect(dateFormatter.compact(date)).toEqual('01.01.2021');
    });
    it('formats extended', () => {
        expect(dateFormatter.dateShortMonthYear(date)).toEqual('1. jan. 2021');
    });
    it('formats full date', () => {
        expect(dateFormatter.full(date)).toEqual('1. januar 2021');
    });
    it('formats name of day', () => {
        expect(dateFormatter.day(date)).toEqual('fredag');
    });
    it('formats compact with day name', () => {
        expect(dateFormatter.dayCompactDate(date)).toEqual('fredag 01.01.2021');
    });
    it('formats extended with day name', () => {
        expect(dateFormatter.dayDateShortMonthYear(date)).toEqual('fredag 1. jan. 2021');
    });
    it('formats full with day name', () => {
        expect(dateFormatter.dayDateMonthYear(date)).toEqual('fredag 1. januar 2021');
    });
    it('formats dayDateAndMonth', () => {
        expect(dateFormatter.dayDateMonth(date)).toEqual('fredag 1. januar');
    });
    it('formats dayDateAndShortMonth', () => {
        expect(dateFormatter.dayDateShortMonth(date)).toEqual('fredag 1. jan.');
    });
});
