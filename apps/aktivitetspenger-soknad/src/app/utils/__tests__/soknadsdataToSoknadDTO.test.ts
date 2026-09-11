import { Søker } from '@sif/api/k9-prosessering';
import { ISODate } from '@sif/utils';

import { Søknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { søknadsdataToSøknadDTO } from '../soknadsdataToSoknadDTO';

const søker: Søker = {
    aktørId: '1000000000001',
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    fødselsnummer: '12345678901',
};

const komplettSøknadsdata: Søknadsdata = {
    harForståttRettigheterOgPlikter: true,
    [SøknadStepId.BARN]: { informasjonStemmer: true },
    [SøknadStepId.BOSTED]: { erBosattITrondheim: true },
    [SøknadStepId.KONTONUMMER]: { kontonummerErRiktig: true },
    [SøknadStepId.MEDLEMSKAP]: {
        harBoddINorge: true,
        harJobbetUtenforNorge: true,
        arbeidsstederUtenforNorge: [
            {
                id: '1',
                landkode: 'SE',
                landnavn: 'Sverige',
                periode: { from: '2020-01-01' as ISODate, to: '2020-06-01' as ISODate },
                jobbetIPerioden: true,
                identitetsnummer: undefined,
            },
        ],
    },
};

const baseArgs = {
    søker,
    kontoInfo: { harKontonummer: 'JA' as const },
    startdato: '2024-01-01' as ISODate,
};

describe('søknadsdataToSøknadDTO', () => {
    it('skal mappe komplett søknadsdata til en gyldig DTO', () => {
        const result = søknadsdataToSøknadDTO({ ...baseArgs, søknadsdata: komplettSøknadsdata });

        expect(result).toBeDefined();
        expect(result?.søkerNorskIdent).toBe(søker.fødselsnummer);
        expect(result?.språk).toBe('nb');
        expect(result?.barnErRiktig).toBe(true);
        expect(result?.erBosattITrondheim).toBe(true);
        expect(result?.startdato).toBe('2024-01-01');
        expect(result?.medlemskap.arbeidsstederUtenforNorge).toEqual([
            {
                landkode: 'SE',
                landnavn: 'Sverige',
                fraOgMed: '2020-01-01',
                tilOgMed: '2020-06-01',
                jobbetIPerioden: true,
                identitetsnummer: undefined,
            },
        ]);
    });

    it('skal bruke oppgitt språk når det er satt', () => {
        const result = søknadsdataToSøknadDTO({ ...baseArgs, søknadsdata: komplettSøknadsdata, språk: 'nn' });

        expect(result?.språk).toBe('nn');
    });

    it.each([
        ['barn', { ...komplettSøknadsdata, [SøknadStepId.BARN]: undefined }],
        ['bosted', { ...komplettSøknadsdata, [SøknadStepId.BOSTED]: undefined }],
        ['kontonummer', { ...komplettSøknadsdata, [SøknadStepId.KONTONUMMER]: undefined }],
        ['medlemskap', { ...komplettSøknadsdata, [SøknadStepId.MEDLEMSKAP]: undefined }],
        ['harForståttRettigheterOgPlikter', { ...komplettSøknadsdata, harForståttRettigheterOgPlikter: undefined }],
    ])('skal returnere undefined når %s mangler i søknadsdata', (_label, søknadsdata) => {
        const result = søknadsdataToSøknadDTO({ ...baseArgs, søknadsdata });

        expect(result).toBeUndefined();
    });

    it('skal returnere undefined når startdato mangler', () => {
        const result = søknadsdataToSøknadDTO({
            ...baseArgs,
            søknadsdata: komplettSøknadsdata,
            startdato: undefined,
        });

        expect(result).toBeUndefined();
    });
});
