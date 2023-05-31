import { OpptjeningAktivitet } from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland';
import { UtenlandskNæringstype } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { OpptjeningIUtlandetApiData, UtenlandskNæringApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { extractOpptjeningUtlandFormValues, extractUtenlandskNæringFormValues } from '../extractArbeidFormValues';

const dato5MånederSiden = dateToISODate(dayjs().subtract(4, 'months').toDate());
const dato4MånederSiden = dateToISODate(dayjs().subtract(4, 'months').toDate());
const dato3MånederSiden = dateToISODate(dayjs().subtract(3, 'months').toDate());
const dato2MånederSiden = dateToISODate(dayjs().subtract(2, 'months').toDate());
const dato1MånedeSiden = dateToISODate(dayjs().subtract(1, 'months').toDate());

describe('extractOpptjeningUtlandFormValues', () => {
    const apiData: OpptjeningIUtlandetApiData = {
        navn: 'opptjeningNavn',
        opptjeningType: OpptjeningAktivitet.ARBEIDSTAKER,
        land: { landkode: 'SWE', landnavn: 'Sverige' },
        fraOgMed: dato2MånederSiden,
        tilOgMed: dato1MånedeSiden,
    };
    it('returnerer opphold som er innenfor siste 3 måneder', () => {
        const result = extractOpptjeningUtlandFormValues([apiData]);
        expect(result).toHaveLength(1);
    });
    it('returnerer opphold som slutter akkurat 3 måneder siden', () => {
        const result = extractOpptjeningUtlandFormValues([
            { ...apiData, fraOgMed: dato5MånederSiden, tilOgMed: dato3MånederSiden },
        ]);
        expect(result).toHaveLength(1);
    });
    it('returnerer ikke opphold som slutter tidligere enn innenfor siste 3 måneder', () => {
        const result = extractOpptjeningUtlandFormValues([
            { ...apiData, fraOgMed: dato5MånederSiden, tilOgMed: dato4MånederSiden },
        ]);
        expect(result).toHaveLength(0);
    });
});

describe('extractUtenlandskNæringFormValues', () => {
    const apiData: UtenlandskNæringApiData = {
        land: { landkode: 'SWE', landnavn: 'Sverige' },
        navnPåVirksomheten: 'Virksomhetsnavn',
        næringstype: UtenlandskNæringstype.JORDBRUK_SKOGBRUK,
        organisasjonsnummer: '123',
        fraOgMed: dato2MånederSiden,
        tilOgMed: dato1MånedeSiden,
    };
    it('returnerer utenlandskNæring som er innenfor siste 3 måneder', () => {
        const result = extractUtenlandskNæringFormValues([apiData]);
        expect(result).toHaveLength(1);
    });
    it('returnerer utenlandskNæring som slutter akkurat 3 måneder siden', () => {
        const result = extractUtenlandskNæringFormValues([
            { ...apiData, fraOgMed: dato5MånederSiden, tilOgMed: dato3MånederSiden },
        ]);
        expect(result).toHaveLength(1);
    });
    it('returnerer ikke utenlandskNæring som slutter tidligere enn innenfor siste 3 måneder', () => {
        const result = extractUtenlandskNæringFormValues([
            { ...apiData, fraOgMed: dato5MånederSiden, tilOgMed: dato4MånederSiden },
        ]);
        expect(result).toHaveLength(0);
    });
});
