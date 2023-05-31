import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/types';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import {
    UtenlandsoppholdIPeriodenApiData,
    UtenlandsoppholdUtenforEøsIPeriodenApiData,
} from '../../../types/søknad-api-data/SøknadApiData';
import {
    extractFerieIPeriodenFormValues,
    extractUtenlandsoppholdIPeriodenFormValues,
    mapUtenlandsoppholdApiDataToUtenlandsopphold,
} from '../extractTidsromFormValues';

describe('extractTidsromFormValues', () => {
    describe('extractFerieIPeriodenFormValues', () => {
        it('returnerer riktig når ferie er undefined eller bruker har svart nei', () => {
            expect(
                extractFerieIPeriodenFormValues({ skalTaUtFerieIPerioden: false, ferieuttak: [] })
                    .skalTaUtFerieIPerioden
            ).toEqual(YesOrNo.NO);
            expect(extractFerieIPeriodenFormValues(undefined).skalTaUtFerieIPerioden).toEqual(YesOrNo.NO);
        });
        it('returnerer riktig når skalHaFerieIPerioden', () => {
            expect(
                extractFerieIPeriodenFormValues({
                    skalTaUtFerieIPerioden: true,
                    ferieuttak: [
                        {
                            fraOgMed: '2020-01-01',
                            tilOgMed: '2020-01-02',
                        },
                    ],
                }).skalTaUtFerieIPerioden
            ).toEqual(YesOrNo.YES);
        });
    });
    describe('extractUtenlandsoppholdIPeriodenFormValues', () => {
        it('returnerer NO dersom utenlandsopphold er undefined eller skalOppholdeSegIUtlandetIPerioden===false', () => {
            expect(extractUtenlandsoppholdIPeriodenFormValues(undefined).skalOppholdeSegIUtlandetIPerioden).toEqual(
                YesOrNo.NO
            );
            expect(
                extractUtenlandsoppholdIPeriodenFormValues({ skalOppholdeSegIUtlandetIPerioden: false, opphold: [] })
                    .skalOppholdeSegIUtlandetIPerioden
            ).toEqual(YesOrNo.NO);
        });
        it('returnerer YES dersom skalOppholdeSegIUtlandetIPerioden === true', () => {
            expect(
                extractUtenlandsoppholdIPeriodenFormValues({ skalOppholdeSegIUtlandetIPerioden: true, opphold: [] })
                    .skalOppholdeSegIUtlandetIPerioden
            ).toEqual(YesOrNo.YES);
        });
    });
    describe('mapUtenlandsoppholdApiDataToUtenlandsopphold', () => {
        const oppholdInnenforEØS: UtenlandsoppholdIPeriodenApiData = {
            fraOgMed: '2020-01-01',
            tilOgMed: '2020-02-01',
            landkode: 'SWE',
            landnavn: 'Sverige',
        };
        const oppholdUtenforEØS_innlagt: UtenlandsoppholdUtenforEøsIPeriodenApiData = {
            fraOgMed: '2020-01-01',
            tilOgMed: '2020-02-01',
            landkode: 'THA',
            landnavn: 'Thailand',
            erBarnetInnlagt: true,
            erUtenforEøs: true,
            perioderBarnetErInnlagt: [{ fraOgMed: '2020-01-01', tilOgMed: '2020-01-05' }],
            årsak: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
        };
        const oppholdUtenforEØS_ikkeInnlagt: UtenlandsoppholdUtenforEøsIPeriodenApiData = {
            fraOgMed: '2020-01-01',
            tilOgMed: '2020-02-01',
            landkode: 'THA',
            landnavn: 'Thailand',
            erBarnetInnlagt: false,
            erUtenforEøs: true,
            perioderBarnetErInnlagt: [],
            årsak: null,
        };
        it('returnerer riktig når det er et opphold innenfør EØS', () => {
            const result = mapUtenlandsoppholdApiDataToUtenlandsopphold(oppholdInnenforEØS);
            expect(result.fom).toBeDefined();
            expect(result.tom).toBeDefined();
            expect(result.landkode).toEqual('SWE');
            expect(result.erBarnetInnlagt).toBeUndefined();
            expect(result.barnInnlagtPerioder).toBeUndefined();
            expect(result.årsak).toBeUndefined();
        });
        describe('utenlandsopphold utenfor EØS', () => {
            it('returnerer riktig når det er et opphold utenfor EØS - innlagt', () => {
                const result = mapUtenlandsoppholdApiDataToUtenlandsopphold(oppholdUtenforEØS_innlagt);
                expect(result.fom).toBeDefined();
                expect(result.tom).toBeDefined();
                expect(result.landkode).toEqual('THA');
                expect(result.erBarnetInnlagt).toEqual(YesOrNo.YES);
                expect(result.barnInnlagtPerioder).toBeDefined();
                if (result.barnInnlagtPerioder) {
                    expect(result.barnInnlagtPerioder?.length).toEqual(1);
                    expect(dateToISODate(result.barnInnlagtPerioder[0].fom)).toEqual('2020-01-01');
                    expect(dateToISODate(result.barnInnlagtPerioder[0].tom)).toEqual('2020-01-05');
                }
                expect(result.årsak).toEqual(UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE);
            });
            it('returnerer riktig når det er et opphold utenfor EØS - ikke innlagt', () => {
                const result = mapUtenlandsoppholdApiDataToUtenlandsopphold(oppholdUtenforEØS_ikkeInnlagt);
                expect(result.fom).toBeDefined();
                expect(result.tom).toBeDefined();
                expect(result.landkode).toEqual('THA');
                expect(result.erBarnetInnlagt).toEqual(YesOrNo.NO);
                expect(result.barnInnlagtPerioder).toBeDefined();
                expect(result.barnInnlagtPerioder?.length).toEqual(0);
                expect(result.årsak).toBeUndefined();
            });
        });
    });
});
