import { BarnSammeAdresse } from '@app/types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '@app/types/SøkersRelasjonTilBarnet';
import { OmBarnetSøknadsdata } from '@app/types/Soknadsdata';
import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { YesOrNo } from '@sif/rhf';
import { afterAll, describe, expect, it, test, vi } from 'vitest';

import {
    getMinDatoForBarnetsFødselsdato,
    isBarnOver18år,
    toOmBarnetFormValues,
    toOmBarnetSøknadsdata,
} from '../omBarnetStegUtils';
import { ANNET_BARN } from '../types';

const registrertBarn: RegistrertBarn = {
    aktørId: 'barn-123',
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    mellomnavn: undefined,
    fødselsdato: new Date('2018-01-01'),
};

describe('toOmBarnetFormValues', () => {
    it('returnerer tomt objekt når søknadsdata er undefined', () => {
        expect(toOmBarnetFormValues(undefined)).toEqual({});
    });

    it('mapper registrertBarn til riktige skjemaverdier', () => {
        const søknadsdata: OmBarnetSøknadsdata = {
            type: 'registrertBarn',
            registrertBarn,
            sammeAdresse: BarnSammeAdresse.JA,
            kroniskEllerFunksjonshemming: true,
        };
        const result = toOmBarnetFormValues(søknadsdata);
        expect(result.barnetSøknadenGjelder).toBe('barn-123');
        expect(result.sammeAdresse).toBe(BarnSammeAdresse.JA);
        expect(result.kroniskEllerFunksjonshemming).toBe(YesOrNo.YES);
    });

    it('mapper annetBarn til riktige skjemaverdier', () => {
        const søknadsdata: OmBarnetSøknadsdata = {
            type: 'annetBarn',
            barnetsFødselsnummer: '12345678901',
            barnetsFødselsdato: '2018-01-01',
            barnetsNavn: 'Ola Nordmann',
            søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.MOR,
            sammeAdresse: BarnSammeAdresse.NEI,
            kroniskEllerFunksjonshemming: false,
        };
        const result = toOmBarnetFormValues(søknadsdata);
        expect(result.barnetSøknadenGjelder).toBe(ANNET_BARN);
        expect(result.barnetsFødselsnummer).toBe('12345678901');
        expect(result.barnetsNavn).toBe('Ola Nordmann');
        expect(result.kroniskEllerFunksjonshemming).toBe(YesOrNo.NO);
    });

    it('mapper høyereRisikoForFravær korrekt', () => {
        const søknadsdata: OmBarnetSøknadsdata = {
            type: 'registrertBarn',
            registrertBarn,
            sammeAdresse: BarnSammeAdresse.JA,
            kroniskEllerFunksjonshemming: true,
            høyereRisikoForFravær: true,
            høyereRisikoForFraværBeskrivelse: 'Beskrivelse her',
        };
        const result = toOmBarnetFormValues(søknadsdata);
        expect(result.høyereRisikoForFravær).toBe(YesOrNo.YES);
        expect(result.høyereRisikoForFraværBeskrivelse).toBe('Beskrivelse her');
    });

    it('setter høyereRisikoForFravær til undefined når feltet mangler', () => {
        const søknadsdata: OmBarnetSøknadsdata = {
            type: 'registrertBarn',
            registrertBarn,
            sammeAdresse: BarnSammeAdresse.JA,
            kroniskEllerFunksjonshemming: true,
        };
        const result = toOmBarnetFormValues(søknadsdata);
        expect(result.høyereRisikoForFravær).toBeUndefined();
    });
});

describe('toOmBarnetSøknadsdata', () => {
    it('returnerer undefined når påkrevde felter mangler', () => {
        expect(toOmBarnetSøknadsdata({}, [])).toBeUndefined();
        expect(toOmBarnetSøknadsdata({ sammeAdresse: BarnSammeAdresse.JA }, [])).toBeUndefined();
    });

    it('returnerer registrertBarn-søknadsdata når barn finnes i listen', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetSøknadenGjelder: 'barn-123',
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.NO,
            },
            [registrertBarn],
        );
        expect(result?.type).toBe('registrertBarn');
        if (result?.type === 'registrertBarn') {
            expect(result.registrertBarn.aktørId).toBe('barn-123');
            expect(result.kroniskEllerFunksjonshemming).toBe(false);
        }
    });

    it('returnerer undefined når registrert barn ikke finnes i listen', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetSøknadenGjelder: 'ukjent-barn',
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.NO,
            },
            [registrertBarn],
        );
        expect(result).toBeUndefined();
    });

    it('returnerer annetBarn-søknadsdata når ANNET_BARN er valgt', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetSøknadenGjelder: ANNET_BARN,
                barnetsFødselsnummer: '12345678901',
                barnetsFødselsdato: '2018-01-01',
                barnetsNavn: 'Ola Nordmann',
                søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.MOR,
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.YES,
            },
            [registrertBarn],
        );
        expect(result?.type).toBe('annetBarn');
        if (result?.type === 'annetBarn') {
            expect(result.barnetsFødselsnummer).toBe('12345678901');
            expect(result.søkersRelasjonTilBarnet).toBe(SøkersRelasjonTilBarnet.MOR);
        }
    });

    it('returnerer undefined for annetBarn når påkrevde barnefelt mangler', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetSøknadenGjelder: ANNET_BARN,
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.YES,
            },
            [registrertBarn],
        );
        expect(result).toBeUndefined();
    });

    it('setter ikke høyereRisikoForFravær når kroniskEllerFunksjonshemming er NO', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetSøknadenGjelder: 'barn-123',
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.NO,
                høyereRisikoForFravær: YesOrNo.YES,
            },
            [registrertBarn],
        );
        expect(result?.høyereRisikoForFravær).toBeUndefined();
    });

    it('setter høyereRisikoForFravær og beskrivelse når kronisk er YES', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetSøknadenGjelder: 'barn-123',
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.YES,
                høyereRisikoForFravær: YesOrNo.YES,
                høyereRisikoForFraværBeskrivelse: 'En beskrivelse',
            },
            [registrertBarn],
        );
        expect(result?.høyereRisikoForFravær).toBe(true);
        expect(result?.høyereRisikoForFraværBeskrivelse).toBe('En beskrivelse');
    });

    it('behandler tom registrerteBarn-liste som annetBarn-flyt', () => {
        const result = toOmBarnetSøknadsdata(
            {
                barnetsFødselsnummer: '12345678901',
                barnetsFødselsdato: '2018-01-01',
                barnetsNavn: 'Ola Nordmann',
                søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FAR,
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: YesOrNo.NO,
            },
            [],
        );
        expect(result?.type).toBe('annetBarn');
    });
});

describe('isBarnOver18år', () => {
    it('returnerer false når barnet er 18 år men fristen 1. april året etter ikke er passert', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-03-31'));
        const fødselsdato = new Date('2004-09-15');

        expect(isBarnOver18år(fødselsdato)).toBe(false);
    });

    it('returnerer true når datoen er 1. april eller senere året etter barnet fylte 18 år', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-04-01'));
        const fødselsdato = new Date('2004-09-15');

        expect(isBarnOver18år(fødselsdato)).toBe(true);
    });

    it('returnerer false når barnet ikke har fylt 18 år ennå', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-04-15'));
        const fødselsdato = new Date('2020-01-15');

        expect(isBarnOver18år(fødselsdato)).toBe(false);
    });

    it('returnerer false når barnet fylte 18 i år og dagens dato er før 1. april neste år', () => {
        vi.useFakeTimers().setSystemTime(new Date('2024-02-15'));
        const fødselsdato = new Date('2005-01-01');

        expect(isBarnOver18år(fødselsdato)).toBe(false);
    });

    afterAll(() => vi.useRealTimers());
});

describe('getMinDatoForBarnetsFødselsdato', () => {
    test('returnerer en Date-instans', () => {
        expect(getMinDatoForBarnetsFødselsdato()).toBeInstanceOf(Date);
    });

    test('returnerer start av året for 19 år siden når dagens dato er før 1. april', () => {
        vi.useFakeTimers().setSystemTime(new Date('2023-03-31'));

        expect(getMinDatoForBarnetsFødselsdato().getFullYear()).toBe(2004);
    });

    afterAll(() => vi.useRealTimers());
});
