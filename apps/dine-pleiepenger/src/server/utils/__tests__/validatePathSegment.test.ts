import { describe, expect, it } from 'vitest';

import { validateDokumentTittel, validatePathSegment, validateSaksnummer } from '../validatePathSegment';

describe('validatePathSegment', () => {
    describe('gyldige path-segmenter', () => {
        it('aksepterer alfanumeriske tegn', () => {
            expect(() => validatePathSegment('abc123')).not.toThrow();
        });

        it('aksepterer bindestrek', () => {
            expect(() => validatePathSegment('abc-123')).not.toThrow();
        });

        it('aksepterer understrek', () => {
            expect(() => validatePathSegment('abc_123')).not.toThrow();
        });

        it('aksepterer UUID-format', () => {
            expect(() => validatePathSegment('550e8400-e29b-41d4-a716-446655440000')).not.toThrow();
        });

        it('aksepterer numerisk ID', () => {
            expect(() => validatePathSegment('12345678')).not.toThrow();
        });

        it('aksepterer store og små bokstaver', () => {
            expect(() => validatePathSegment('AbCdEf')).not.toThrow();
        });
    });

    describe('ugyldige path-segmenter - SSRF-beskyttelse', () => {
        it('avviser path traversal med ..', () => {
            expect(() => validatePathSegment('..')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser path traversal med ../', () => {
            expect(() => validatePathSegment('../etc')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser forward slash', () => {
            expect(() => validatePathSegment('abc/def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser backslash', () => {
            expect(() => validatePathSegment('abc\\def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser URL-scheme med kolon', () => {
            expect(() => validatePathSegment('http:')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser full URL', () => {
            expect(() => validatePathSegment('http://example.com')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser mellomrom', () => {
            expect(() => validatePathSegment('abc def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser punktum', () => {
            expect(() => validatePathSegment('abc.def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser spesialtegn', () => {
            expect(() => validatePathSegment('abc@def')).toThrow('inneholder ugyldige tegn');
            expect(() => validatePathSegment('abc#def')).toThrow('inneholder ugyldige tegn');
            expect(() => validatePathSegment('abc?def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser URL-encoded path traversal', () => {
            expect(() => validatePathSegment('%2e%2e')).toThrow('inneholder ugyldige tegn');
            expect(() => validatePathSegment('%2e%2fetc')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser URL-encoded skråstrek', () => {
            expect(() => validatePathSegment('abc%2fdef')).toThrow('inneholder ugyldige tegn');
            expect(() => validatePathSegment('abc%5Cdef')).toThrow('inneholder ugyldige tegn');
        });
    });

    describe('tomme og ugyldige typer', () => {
        it('avviser tom streng', () => {
            expect(() => validatePathSegment('')).toThrow('er påkrevd og må være en streng');
        });

        it('avviser null', () => {
            expect(() => validatePathSegment(null as unknown as string)).toThrow('er påkrevd og må være en streng');
        });

        it('avviser undefined', () => {
            expect(() => validatePathSegment(undefined as unknown as string)).toThrow(
                'er påkrevd og må være en streng',
            );
        });

        it('avviser tall', () => {
            expect(() => validatePathSegment(123 as unknown as string)).toThrow('er påkrevd og må være en streng');
        });
    });

    describe('custom paramName', () => {
        it('bruker custom paramName i feilmelding', () => {
            expect(() => validatePathSegment('', 'TestParam')).toThrow('TestParam er påkrevd og må være en streng');
        });

        it('bruker custom paramName for ugyldige tegn', () => {
            expect(() => validatePathSegment('abc/def', 'TestParam')).toThrow('TestParam inneholder ugyldige tegn');
        });
    });
});

describe('validateSaksnummer', () => {
    it('aksepterer gyldig saksnummer', () => {
        expect(() => validateSaksnummer('12345678')).not.toThrow();
    });

    it('aksepterer UUID som saksnummer', () => {
        expect(() => validateSaksnummer('550e8400-e29b-41d4-a716-446655440000')).not.toThrow();
    });

    it('avviser ugyldig saksnummer med feilmelding som inneholder "Saksnummer"', () => {
        expect(() => validateSaksnummer('../etc')).toThrow('Saksnummer inneholder ugyldige tegn');
    });

    it('avviser tomt saksnummer', () => {
        expect(() => validateSaksnummer('')).toThrow('Saksnummer er påkrevd og må være en streng');
    });
});

describe('validateDokumentTittel', () => {
    describe('gyldige dokumenttitler', () => {
        it('aksepterer alfanumeriske tegn', () => {
            expect(() => validateDokumentTittel('Dokument123')).not.toThrow();
        });

        it('aksepterer mellomrom', () => {
            expect(() => validateDokumentTittel('Min Dokumenttittel')).not.toThrow();
        });

        it('aksepterer punktum', () => {
            expect(() => validateDokumentTittel('dokument.pdf')).not.toThrow();
        });

        it('aksepterer bindestrek', () => {
            expect(() => validateDokumentTittel('dokument-tittel')).not.toThrow();
        });

        it('aksepterer understrek', () => {
            expect(() => validateDokumentTittel('dokument_tittel')).not.toThrow();
        });

        it('aksepterer norske bokstaver', () => {
            expect(() => validateDokumentTittel('Søknad om pleiepenger')).not.toThrow();
        });

        it('aksepterer store norske bokstaver', () => {
            expect(() => validateDokumentTittel('SØKNAD OM PLEIEPENGER')).not.toThrow();
        });

        it('aksepterer typisk dokumentnavn', () => {
            expect(() => validateDokumentTittel('Søknad om pleiepenger - 2024.pdf')).not.toThrow();
        });
    });

    describe('ugyldige dokumenttitler - SSRF-beskyttelse', () => {
        it('avviser path traversal med ../', () => {
            expect(() => validateDokumentTittel('../etc/passwd')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser forward slash', () => {
            expect(() => validateDokumentTittel('abc/def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser backslash', () => {
            expect(() => validateDokumentTittel('abc\\def')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser URL-scheme med kolon', () => {
            expect(() => validateDokumentTittel('http://example.com')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser spesialtegn', () => {
            expect(() => validateDokumentTittel('dokument@tittel')).toThrow('inneholder ugyldige tegn');
            expect(() => validateDokumentTittel('dokument#tittel')).toThrow('inneholder ugyldige tegn');
            expect(() => validateDokumentTittel('dokument?tittel')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser URL-encoded path traversal', () => {
            expect(() => validateDokumentTittel('%2e%2e')).toThrow('inneholder ugyldige tegn');
            expect(() => validateDokumentTittel('%2e%2fetc%2fpasswd')).toThrow('inneholder ugyldige tegn');
        });

        it('avviser URL-encoded skråstrek', () => {
            expect(() => validateDokumentTittel('dokument%2fnavn')).toThrow('inneholder ugyldige tegn');
            expect(() => validateDokumentTittel('dokument%5Cnavn')).toThrow('inneholder ugyldige tegn');
        });
    });

    describe('tomme og ugyldige typer', () => {
        it('avviser tom streng', () => {
            expect(() => validateDokumentTittel('')).toThrow('Dokumenttittel er påkrevd og må være en streng');
        });

        it('avviser null', () => {
            expect(() => validateDokumentTittel(null as unknown as string)).toThrow(
                'Dokumenttittel er påkrevd og må være en streng',
            );
        });

        it('avviser undefined', () => {
            expect(() => validateDokumentTittel(undefined as unknown as string)).toThrow(
                'Dokumenttittel er påkrevd og må være en streng',
            );
        });
    });
});
