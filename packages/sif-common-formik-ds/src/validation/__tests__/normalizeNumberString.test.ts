import { normalizeNumberString } from '../normalizeNumberString';

describe('normalizeNumberString', () => {
    it("should convert '100.000,50' to 100000.50", () => {
        const value = '100.000,50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(100000.5);
    });

    it("should convert '100000,50' to 100000.50", () => {
        const value = '100000,50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(100000.5);
    });

    it("should convert '100,000.50' to 100000.50", () => {
        const value = '100,000.50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(100000.5);
    });
    it("should convert '100 000,50' to 100000.50", () => {
        const value = '100 000.50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(100000.5);
    });
    it("should convert '12 100 000,50' to 12100000.50", () => {
        const value = '12 100 000.50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(12100000.5);
    });
    it("should convert '50.000.000' to 50000000", () => {
        const value = '50.000.000';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(50000000);
    });

    it("should convert '50,000,000' to 50000000", () => {
        const value = '50,000,000';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(50000000);
    });

    it("should convert '120000,40' to 120000.40", () => {
        const value = '120000,40';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(120000.4);
    });

    it("should convert '120,000.40' to 120000.40", () => {
        const value = '120,000.40';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(120000.4);
    });
    it("should convert '1,000,000.50' to 1000000.5", () => {
        const value = '1,000,000.50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(1000000.5);
    });
    it("should convert '1000.50' to 1000.5", () => {
        const value = '1000.50';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(1000.5);
    });
    it("should convert '1000.5001' to 1000.5001", () => {
        const value = '1000.5001';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(1000.5001);
    });
    it("should convert '-1' to -1", () => {
        const value = '-1';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(-1);
    });
    it("should convert '-1.100.001' to -1100001", () => {
        const value = '-1.100.001';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(-1100001);
    });
    it("should convert '-1,100.001' to -1100.001", () => {
        const value = '-1,100.001';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(-1100.001);
    });
    it("should convert '-0,2' to -0.2", () => {
        const value = '-0,2';
        const result = normalizeNumberString(value);
        expect(Number(result)).toBe(-0.2);
    });
    it("should throw an error for '100.20,300'", () => {
        const value = '100.20,300';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '100 20,300'", () => {
        const value = '100 20,300';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '100 20.300'", () => {
        const value = '100 20.300';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '100 20,300'", () => {
        const value = '100 20,300';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '-0,001' (indecisive)", () => {
        const value = '-0,001';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '1000.500'", () => {
        const value = '1000.500';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });

    it("should throw an error for '100.000'", () => {
        const value = '100.000';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });

    it("should throw an error for '100,000'", () => {
        const value = '100,000';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '1.2.3'", () => {
        const value = '1.2.3';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '1.2.300'", () => {
        const value = '1.2.300';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '100.20.300'", () => {
        const value = '100.20.300';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '2e9'", () => {
        const value = '2e9';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '2E9'", () => {
        const value = '2E9';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '1 2'", () => {
        const value = '1 2';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '12 100.000,50'", () => {
        const value = '12 100.000.50';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '1.100.000 50'", () => {
        const value = '1.100.000 50';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
    it("should throw an error for '1,100 50'", () => {
        const value = '1,000 50';
        expect(() => normalizeNumberString(value)).toThrow('Invalid number format');
    });
});
