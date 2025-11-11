import { describe, expect, it } from 'vitest';

import { PleietrengendeSchema } from './PleietrengendeSchema';

describe('PleietrengendeSchema', () => {
    const baseData = {
        aktørId: '123456789',
        fødselsdato: '2010-01-01',
        identitetsnummer: '12345678901',
    };

    describe('Ikke-anonymisert pleietrengende', () => {
        it('skal parse gyldig ikke-anonymisert person med alle navn', () => {
            const data = {
                ...baseData,
                fornavn: 'Ola',
                mellomnavn: 'Andreas',
                etternavn: 'Nordmann',
            };

            const result = PleietrengendeSchema.parse(data);

            expect(result.anonymisert).toBe(false);
            expect(result.fornavn).toBe('Ola');
            expect(result.mellomnavn).toBe('Andreas');
            expect(result.etternavn).toBe('Nordmann');
        });

        it('skal parse gyldig ikke-anonymisert person uten mellomnavn', () => {
            const data = {
                ...baseData,
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
            };

            const result = PleietrengendeSchema.parse(data);

            expect(result.anonymisert).toBe(false);
            expect(result.fornavn).toBe('Ola');
            expect(result.mellomnavn).toBeNull();
            expect(result.etternavn).toBe('Nordmann');
        });
    });

    describe('Anonymisert pleietrengende', () => {
        it('skal transformere null-verdier til undefined for navn', () => {
            const data = {
                ...baseData,
                fornavn: null,
                mellomnavn: null,
                etternavn: null,
            };

            const result = PleietrengendeSchema.parse(data);

            expect(result.anonymisert).toBe(true);
            expect(result.fornavn).toBeUndefined();
            expect(result.mellomnavn).toBeUndefined();
            expect(result.etternavn).toBeUndefined();
        });

        it('skal parse anonymisert person med undefined navn-felter', () => {
            const data = {
                ...baseData,
                fornavn: undefined,
                mellomnavn: undefined,
                etternavn: undefined,
            };

            const result = PleietrengendeSchema.parse(data);

            expect(result.anonymisert).toBe(true);
            expect(result.fornavn).toBeUndefined();
            expect(result.mellomnavn).toBeUndefined();
            expect(result.etternavn).toBeUndefined();
        });

        it('skal parse anonymisert person uten navn-felter', () => {
            const data = {
                ...baseData,
            };

            const result = PleietrengendeSchema.parse(data);

            expect(result.anonymisert).toBe(true);
            expect(result.fornavn).toBeUndefined();
            expect(result.mellomnavn).toBeUndefined();
            expect(result.etternavn).toBeUndefined();
        });
    });

    describe('Type inferens', () => {
        it('skal ha riktige typer for anonymisert og ikke-anonymisert', () => {
            const ikkeAnonymisert = {
                ...baseData,
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
            };

            const anonymisert = {
                ...baseData,
                fornavn: null,
                mellomnavn: null,
                etternavn: null,
            };

            const resultIkkeAnonymisert = PleietrengendeSchema.parse(ikkeAnonymisert);
            const resultAnonymisert = PleietrengendeSchema.parse(anonymisert);

            // Type guards basert på anonymisert-flagget
            if (resultIkkeAnonymisert.anonymisert === false) {
                // TypeScript skal vite at fornavn og etternavn er strings her
                const _fornavn: string = resultIkkeAnonymisert.fornavn;
                const _etternavn: string = resultIkkeAnonymisert.etternavn;
                expect(_fornavn).toBe('Ola');
                expect(_etternavn).toBe('Nordmann');
            }

            if (resultAnonymisert.anonymisert === true) {
                // TypeScript skal vite at navn kan være null/undefined her
                expect(resultAnonymisert.fornavn).toBeUndefined();
                expect(resultAnonymisert.etternavn).toBeUndefined();
            }
        });

        it('skal sette anonymisert=false hvis fornavn eller etternavn har verdi', () => {
            const dataMedFornavn = {
                ...baseData,
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
            };

            const result = PleietrengendeSchema.parse(dataMedFornavn);
            expect(result.anonymisert).toBe(false);
        });

        it('skal sette anonymisert=true hvis fornavn og etternavn er null', () => {
            const dataMedNull = {
                ...baseData,
                fornavn: null,
                mellomnavn: null,
                etternavn: null,
            };

            const result = PleietrengendeSchema.parse(dataMedNull);
            expect(result.anonymisert).toBe(true);
        });

        it('skal sette anonymisert=true hvis fornavn og etternavn mangler', () => {
            const dataUtenNavn = {
                ...baseData,
            };

            const result = PleietrengendeSchema.parse(dataUtenNavn);
            expect(result.anonymisert).toBe(true);
        });
    });
});
