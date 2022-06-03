"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const dateFormatter_1 = require("../dateFormatter");
describe('dateFormatter', () => {
    const date = (0, __1.ISODateToDate)('2021-01-01');
    it('formats compact', () => {
        expect(dateFormatter_1.dateFormatter.compact(date)).toEqual('01.01.2021');
    });
    it('formats extended', () => {
        expect(dateFormatter_1.dateFormatter.dateShortMonthYear(date)).toEqual('1. jan. 2021');
    });
    it('formats full date', () => {
        expect(dateFormatter_1.dateFormatter.full(date)).toEqual('1. januar 2021');
    });
    it('formats name of day', () => {
        expect(dateFormatter_1.dateFormatter.day(date)).toEqual('fredag');
    });
    it('formats compact with day name', () => {
        expect(dateFormatter_1.dateFormatter.dayCompactDate(date)).toEqual('fredag 01.01.2021');
    });
    it('formats extended with day name', () => {
        expect(dateFormatter_1.dateFormatter.dayDateShortMonthYear(date)).toEqual('fredag 1. jan. 2021');
    });
    it('formats full with day name', () => {
        expect(dateFormatter_1.dateFormatter.dayDateMonthYear(date)).toEqual('fredag 1. januar 2021');
    });
    it('formats dayDateAndMonth', () => {
        expect(dateFormatter_1.dateFormatter.dayDateMonth(date)).toEqual('fredag 1. januar');
    });
    it('formats dayDateAndShortMonth', () => {
        expect(dateFormatter_1.dateFormatter.dayDateShortMonth(date)).toEqual('fredag 1. jan.');
    });
});
