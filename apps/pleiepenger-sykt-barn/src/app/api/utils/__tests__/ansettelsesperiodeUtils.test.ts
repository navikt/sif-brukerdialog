import { describe, expect, it } from 'vitest';

import { AAregOrganisasjon, slåSammenAnsettelsesperioder } from '../ansettelsesperiodeUtils';

const organisasjon = (organisasjonsnummer: string, ansattFom?: string, ansattTom?: string): AAregOrganisasjon => ({
    organisasjonsnummer,
    navn: `Org ${organisasjonsnummer}`,
    ansattFom,
    ansattTom,
});

describe('slåSammenAnsettelsesperioder', () => {
    it('slår sammen to perioder som henger sammen', () => {
        const { organisasjoner, harDuplikater } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-01-10', '2024-01-15'),
            organisasjon('1', '2024-01-01', '2024-01-09'),
        ]);

        expect(organisasjoner).toHaveLength(1);
        expect(organisasjoner[0].ansattFom).toBe('2024-01-01');
        expect(organisasjoner[0].ansattTom).toBe('2024-01-15');
        expect(harDuplikater).toBe(false);
    });

    it('slår sammen en kjede av sammenhengende perioder', () => {
        const { organisasjoner } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-01-01', '2024-01-09'),
            organisasjon('1', '2024-01-10', '2024-01-15'),
            organisasjon('1', '2024-01-16', '2024-01-31'),
        ]);

        expect(organisasjoner).toHaveLength(1);
        expect(organisasjoner[0].ansattTom).toBe('2024-01-31');
    });

    it('bruker første periode og melder om duplikat når det er opphold mellom periodene', () => {
        const { organisasjoner, harDuplikater } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-01-11', '2024-01-20'),
            organisasjon('1', '2024-01-01', '2024-01-09'),
        ]);

        expect(organisasjoner).toHaveLength(1);
        expect(organisasjoner[0].ansattFom).toBe('2024-01-01');
        expect(organisasjoner[0].ansattTom).toBe('2024-01-09');
        expect(harDuplikater).toBe(true);
    });

    it('beholder én oppføring per organisasjon', () => {
        const { organisasjoner, harDuplikater } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-01-01', '2024-01-09'),
            organisasjon('2', '2024-01-10', '2024-01-20'),
        ]);

        expect(organisasjoner).toHaveLength(2);
        expect(harDuplikater).toBe(false);
    });

    it('melder om duplikat når kun én av flere organisasjoner har opphold', () => {
        const { organisasjoner, harDuplikater } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-01-01', '2024-01-09'),
            organisasjon('1', '2024-02-01', '2024-02-10'),
            organisasjon('2', '2024-01-01', '2024-01-31'),
        ]);

        expect(organisasjoner).toHaveLength(2);
        expect(organisasjoner.find((o) => o.organisasjonsnummer === '1')?.ansattTom).toBe('2024-01-09');
        expect(organisasjoner.find((o) => o.organisasjonsnummer === '2')?.ansattTom).toBe('2024-01-31');
        expect(harDuplikater).toBe(true);
    });

    it('slår sammen periode som går over månedsskifte', () => {
        const { organisasjoner } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-02-01', '2024-02-10'),
            organisasjon('1', '2024-01-01', '2024-01-31'),
        ]);

        expect(organisasjoner).toHaveLength(1);
        expect(organisasjoner[0].ansattFom).toBe('2024-01-01');
        expect(organisasjoner[0].ansattTom).toBe('2024-02-10');
    });

    it('slår sammen periode som går over overgang til sommertid', () => {
        const { organisasjoner } = slåSammenAnsettelsesperioder([
            organisasjon('1', '2024-03-01', '2024-03-31'),
            organisasjon('1', '2024-04-01', '2024-04-10'),
        ]);

        expect(organisasjoner).toHaveLength(1);
        expect(organisasjoner[0].ansattTom).toBe('2024-04-10');
    });

    it('beholder løpende periode uten ansattTom', () => {
        const { organisasjoner } = slåSammenAnsettelsesperioder([organisasjon('1', '2024-01-01', undefined)]);

        expect(organisasjoner).toHaveLength(1);
        expect(organisasjoner[0].ansattTom).toBeUndefined();
    });

    it('håndterer tom liste', () => {
        const { organisasjoner, harDuplikater } = slåSammenAnsettelsesperioder([]);

        expect(organisasjoner).toEqual([]);
        expect(harDuplikater).toBe(false);
    });

    it('endrer ikke innkommende data', () => {
        const organisasjoner = [organisasjon('1', '2024-01-01', '2024-01-09'), organisasjon('1', '2024-01-10')];
        slåSammenAnsettelsesperioder(organisasjoner);

        expect(organisasjoner[0].ansattTom).toBe('2024-01-09');
    });
});
