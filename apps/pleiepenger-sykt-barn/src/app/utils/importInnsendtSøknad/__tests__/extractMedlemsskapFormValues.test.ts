import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import {
    date1YearAgo,
    date2YearsAgo,
    date3YearsAgo,
    dateToday,
    dateToISODate,
    ISODate,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { getMedlemsskapDateRanges } from '../../medlemsskapUtils';
import {
    extractMedlemsskapFormValues,
    refordelUtenlandsoppholdUtFraNyDagensDato,
} from '../extractMedlemsskapFormValues';

describe('extractMedlemsskapFormValues', () => {
    it('returnerer korrekt når det ikke har vært eller skal være noen utenlandsopphold', () => {
        const { formValues } = extractMedlemsskapFormValues({
            harBoddIUtlandetSiste12Mnd: false,
            skalBoIUtlandetNeste12Mnd: false,
            utenlandsoppholdNeste12Mnd: [],
            utenlandsoppholdSiste12Mnd: [],
        });
        expect(formValues.harBoddUtenforNorgeSiste12Mnd).toEqual(YesOrNo.NO);
        expect(formValues.skalBoUtenforNorgeNeste12Mnd).toEqual(YesOrNo.NO);
    });
    it('returnerer korrekt når det har vært utenlandsopphold siste 12 måneder', () => {
        const { siste12Måneder } = getMedlemsskapDateRanges(dateToday);
        const fraOgMed: ISODate = dateToISODate(siste12Måneder.from);
        const tilOgMed: ISODate = dateToISODate(dayjs(siste12Måneder.from).add(1, 'day').toDate());
        const { formValues } = extractMedlemsskapFormValues({
            harBoddIUtlandetSiste12Mnd: true,
            skalBoIUtlandetNeste12Mnd: false,
            utenlandsoppholdSiste12Mnd: [{ fraOgMed, tilOgMed, landkode: 'SWE', landnavn: 'Sverige' }],
            utenlandsoppholdNeste12Mnd: [],
        });
        expect(formValues.skalBoUtenforNorgeNeste12Mnd).toEqual(YesOrNo.NO);
        expect(formValues.utenlandsoppholdNeste12Mnd).toHaveLength(0);

        expect(formValues.harBoddUtenforNorgeSiste12Mnd).toEqual(YesOrNo.YES);
        expect(dateToISODate(formValues.utenlandsoppholdSiste12Mnd[0].fom)).toEqual(fraOgMed);
        expect(dateToISODate(formValues.utenlandsoppholdSiste12Mnd[0].tom)).toEqual(tilOgMed);
        expect(formValues.utenlandsoppholdSiste12Mnd[0].id).toBeDefined();
        expect(formValues.utenlandsoppholdSiste12Mnd[0].landkode).toEqual('SWE');
    });
    it('returnerer korrekt når det skal være utenlandsopphold neste 12 måneder', () => {
        const { neste12Måneder } = getMedlemsskapDateRanges(dateToday);
        const fraOgMed: ISODate = dateToISODate(neste12Måneder.from);
        const tilOgMed: ISODate = dateToISODate(dayjs(neste12Måneder.from).add(1, 'day').toDate());
        const { formValues } = extractMedlemsskapFormValues({
            harBoddIUtlandetSiste12Mnd: false,
            skalBoIUtlandetNeste12Mnd: true,
            utenlandsoppholdNeste12Mnd: [{ fraOgMed, tilOgMed, landkode: 'SWE', landnavn: 'Sverige' }],
            utenlandsoppholdSiste12Mnd: [],
        });
        expect(formValues.harBoddUtenforNorgeSiste12Mnd).toEqual(YesOrNo.NO);
        expect(formValues.utenlandsoppholdSiste12Mnd).toHaveLength(0);

        expect(formValues.skalBoUtenforNorgeNeste12Mnd).toEqual(YesOrNo.YES);
        expect(formValues.utenlandsoppholdNeste12Mnd).toHaveLength(1);
        expect(dateToISODate(formValues.utenlandsoppholdNeste12Mnd[0].fom)).toEqual(fraOgMed);
        expect(formValues.utenlandsoppholdNeste12Mnd[0].id).toBeDefined();
        expect(dateToISODate(formValues.utenlandsoppholdNeste12Mnd[0].tom)).toEqual(tilOgMed);
        expect(formValues.utenlandsoppholdNeste12Mnd[0].landkode).toEqual('SWE');
    });
});
describe('refordelUtenlandsoppholdUtFraNyDagensDato', () => {
    const date1MonthAgo = dayjs(dateToday).subtract(1, 'month').toDate();
    const date1MonthFromNow = dayjs(dateToday).add(1, 'month').toDate();
    const bosted: BostedUtland = {
        fom: date1YearAgo,
        tom: date1MonthAgo,
        landkode: 'SWE',
    };

    it('beholder bosted som er innenfor siste 12 måneder', () => {
        const { bostedNeste12Måneder, bostedSiste12Måneder } = refordelUtenlandsoppholdUtFraNyDagensDato(
            [{ ...bosted }],
            dateToday
        );
        expect(bostedSiste12Måneder).toHaveLength(1);
        expect(bostedNeste12Måneder).toHaveLength(0);
    });
    it('fjerner bosted som er utenfor siste 12 måneder', () => {
        const { bostedNeste12Måneder, bostedSiste12Måneder } = refordelUtenlandsoppholdUtFraNyDagensDato(
            [{ ...bosted, fom: date3YearsAgo, tom: date2YearsAgo }],
            dateToday
        );
        expect(bostedSiste12Måneder).toHaveLength(0);
        expect(bostedNeste12Måneder).toHaveLength(0);
    });
    it('beholder bosted som er innenfor neste 12 måneder', () => {
        const { bostedNeste12Måneder, bostedSiste12Måneder } = refordelUtenlandsoppholdUtFraNyDagensDato(
            [{ ...bosted, fom: dateToday, tom: date1MonthFromNow }],
            dateToday
        );
        expect(bostedSiste12Måneder).toHaveLength(0);
        expect(bostedNeste12Måneder).toHaveLength(1);
    });
    it('deler ett bosted som er både innenfor siste og neste 12 måneder i to', () => {
        const { bostedNeste12Måneder, bostedSiste12Måneder } = refordelUtenlandsoppholdUtFraNyDagensDato(
            [{ ...bosted, fom: date1MonthAgo, tom: date1MonthFromNow }],
            dateToday
        );
        const { neste12Måneder, siste12Måneder } = getMedlemsskapDateRanges(dateToday);
        expect(bostedSiste12Måneder).toHaveLength(1);
        expect(dateToISODate(bostedSiste12Måneder[0].tom)).toEqual(dateToISODate(siste12Måneder.to));
        expect(bostedNeste12Måneder).toHaveLength(1);
        expect(dateToISODate(bostedNeste12Måneder[0].fom)).toEqual(dateToISODate(neste12Måneder.from));
        expect(bostedNeste12Måneder[0].id !== bostedSiste12Måneder[0].id);
    });
});
