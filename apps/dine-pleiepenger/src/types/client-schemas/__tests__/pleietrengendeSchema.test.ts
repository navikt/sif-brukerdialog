import { describe, expect, it } from 'vitest';

import { pleietrengendeClientSchema } from '../pleietrengendeClientSchema';

describe('pleietrengendeClientSchema', () => {
    const baseData = {
        fødselsdato: '2010-01-01',
    };

    describe('Ikke-anonymisert pleietrengende', () => {
        it('skal sette anonymisert=false når fornavn og etternavn finnes', () => {
            const result = pleietrengendeClientSchema.parse({
                ...baseData,
                fornavn: 'Ola',
                mellomnavn: 'Andreas',
                etternavn: 'Nordmann',
            });

            expect(result.anonymisert).toBe(false);
            if (result.anonymisert === false) {
                expect(result.fornavn).toBe('Ola');
                expect(result.mellomnavn).toBe('Andreas');
                expect(result.etternavn).toBe('Nordmann');
            }
        });

        it('skal håndtere null i mellomnavn', () => {
            const result = pleietrengendeClientSchema.parse({
                ...baseData,
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
            });

            expect(result.anonymisert).toBe(false);
            if (result.anonymisert === false) {
                expect(result.mellomnavn).toBeNull();
            }
        });
    });

    describe('Anonymisert pleietrengende', () => {
        it('skal sette anonymisert=true og fjerne navn-felter når de er null', () => {
            const result = pleietrengendeClientSchema.parse({
                ...baseData,
                fornavn: null,
                mellomnavn: null,
                etternavn: null,
            });

            expect(result.anonymisert).toBe(true);
            expect('fornavn' in result).toBe(false);
            expect('mellomnavn' in result).toBe(false);
            expect('etternavn' in result).toBe(false);
        });

        it('skal sette anonymisert=true og fjerne navn-felter når de mangler', () => {
            const result = pleietrengendeClientSchema.parse(baseData);

            expect(result.anonymisert).toBe(true);
            expect('fornavn' in result).toBe(false);
            expect('etternavn' in result).toBe(false);
        });
    });

    describe('Type guards', () => {
        it('skal ha riktige TypeScript-typer basert på anonymisert-flagget', () => {
            const ikkeAnonymisert = pleietrengendeClientSchema.parse({
                ...baseData,
                fornavn: 'Ola',
                etternavn: 'Nordmann',
            });

            const anonymisert = pleietrengendeClientSchema.parse(baseData);

            if (ikkeAnonymisert.anonymisert === false) {
                // TypeScript skal vite at fornavn og etternavn er strings
                const _fornavn: string = ikkeAnonymisert.fornavn;
                const _etternavn: string = ikkeAnonymisert.etternavn;
                expect(_fornavn).toBe('Ola');
                expect(_etternavn).toBe('Nordmann');
            }

            if (anonymisert.anonymisert === true) {
                // TypeScript skal vite at navn-felter ikke finnes
                expect('fornavn' in anonymisert).toBe(false);
            }
        });
    });
});
