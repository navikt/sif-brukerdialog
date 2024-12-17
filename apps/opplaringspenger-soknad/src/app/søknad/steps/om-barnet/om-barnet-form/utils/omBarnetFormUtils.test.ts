import { RegistrertBarn } from '@navikt/sif-common-api';
import { ÅrsakBarnetManglerIdentitetsnummer, OmBarnetFormValues, RelasjonTilBarnet } from '../types';
import {
    getOmBarnetFormInitialValues,
    getOmBarnetSøknadsdataFromFormValues,
    omBarnetFormDefaultValues,
} from './omBarnetFormUtils';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { OmBarnetFormSøknadsdata } from '../../../../../types/søknadsdata/Søknadsdata';

const barn1: RegistrertBarn = {
    fornavn: 'ALFABETISK',
    etternavn: 'FAGGOTT',
    aktørId: '2811762539343',
    fødselsdato: ISODateToDate('2019-06-08'),
};

const barn2: RegistrertBarn = {
    fornavn: 'Barn',
    mellomnavn: 'Barne',
    etternavn: 'Barnesen',
    fødselsdato: ISODateToDate('2020-04-20'),
    aktørId: '123',
};

const registrerteBarn: RegistrertBarn[] = [barn1, barn2];

enum Variant {
    registrertBarn = 'registrertBarn',
    annetBarnMor = 'annetBarnMor',
    annetBarnFar = 'annetBarnFar',
    annetBarnUtenFnr = 'annetBarnUtenFnr',
    annetBarnUtenFnrUtland = 'annetBarnUtenFnrUtland',
    annetBarnUtenFnrAnnenRelasjon = 'annetBarnUtenFnrAnnenRelasjon',
}

const formValuesMedFnr: OmBarnetFormValues = {
    søknadenGjelderEtAnnetBarn: true,
    barnetsFødselsnummer: '2811762539343',
    barnetsNavn: 'Navn',
    relasjonTilBarnet: RelasjonTilBarnet.MOR,
};

const formValuesBarnUtenFnr: OmBarnetFormValues = {
    barnetHarIkkeFnr: true,
    søknadenGjelderEtAnnetBarn: true,
    barnetsFødselsdato: '2020-01-01',
    barnetsNavn: 'Navn',
    fødselsattest: [],
    relasjonTilBarnet: RelasjonTilBarnet.MEDMOR,

    årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT,
};

const testdata: Record<Variant, { formValues: OmBarnetFormValues; søknadsdata: OmBarnetFormSøknadsdata }> = {
    registrertBarn: {
        søknadsdata: {
            type: 'registrerteBarn',
            aktørId: '2811762539343',
            registrertBarn: barn1,
        },
        formValues: {
            barnetSøknadenGjelder: '2811762539343',
        },
    },
    annetBarnMor: {
        formValues: {
            ...formValuesMedFnr,
            relasjonTilBarnet: RelasjonTilBarnet.MOR,
        },
        søknadsdata: {
            type: 'annetBarn',
            barnetsFødselsnummer: '2811762539343',
            relasjonTilBarnet: RelasjonTilBarnet.MOR,
            barnetsNavn: 'Navn',
        },
    },
    annetBarnFar: {
        formValues: {
            ...formValuesMedFnr,
            relasjonTilBarnet: RelasjonTilBarnet.FAR,
        },
        søknadsdata: {
            type: 'annetBarn',
            barnetsFødselsnummer: '2811762539343',
            relasjonTilBarnet: RelasjonTilBarnet.FAR,
            barnetsNavn: 'Navn',
        },
    },
    annetBarnUtenFnr: {
        formValues: {
            ...formValuesBarnUtenFnr,
        },
        søknadsdata: {
            type: 'annetBarnUtenFnr',
            fødselsattest: [],
            barnetsFødselsdato: ISODateToDate('2020-01-01'),
            barnetsNavn: 'Navn',
            relasjonTilBarnet: RelasjonTilBarnet.MEDMOR,
            årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT,
        },
    },
    annetBarnUtenFnrUtland: {
        formValues: {
            ...formValuesBarnUtenFnr,
            relasjonTilBarnet: RelasjonTilBarnet.ANNET,
            årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET,
            relasjonTilBarnetBeskrivelse: 'Beskrivelse',
            fødselsattest: [{} as any],
        },
        søknadsdata: {
            type: 'annetBarnUtenFnr',
            fødselsattest: [{} as any],
            barnetsFødselsdato: ISODateToDate('2020-01-01'),
            barnetsNavn: 'Navn',
            relasjonTilBarnet: RelasjonTilBarnet.ANNET,
            relasjonTilBarnetBeskrivelse: 'Beskrivelse',
            årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET,
        },
    },
    annetBarnUtenFnrAnnenRelasjon: {
        formValues: {
            ...formValuesBarnUtenFnr,
            relasjonTilBarnet: RelasjonTilBarnet.ANNET,
            relasjonTilBarnetBeskrivelse: 'Beskrivelse',
        },
        søknadsdata: {
            type: 'annetBarnUtenFnr',
            fødselsattest: [],
            barnetsFødselsdato: ISODateToDate('2020-01-01'),
            barnetsNavn: 'Navn',
            relasjonTilBarnet: RelasjonTilBarnet.ANNET,
            relasjonTilBarnetBeskrivelse: 'Beskrivelse',
            årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT,
        },
    },
};

describe('getOmBarnetSøknadsdataFromFormValues', () => {
    it('søknaden gjelder et registrert barn', () => {
        const { formValues, søknadsdata } = testdata.registrertBarn;
        expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
    });
    describe('søknaden gjelder et annet barn med fnr', () => {
        it('returnerer riktig for barn med fnr - MOR', () => {
            const { formValues, søknadsdata } = testdata.annetBarnMor;
            expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
        });
        it('returnerer riktig for barn med fnr - FAR', () => {
            const { formValues, søknadsdata } = testdata.annetBarnFar;
            expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
        });
        it('returnerer riktig for barn med fnr - Annet', () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnrAnnenRelasjon;
            expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
        });
    });
    describe('søknaden gjelder et annet barn uten fnr', () => {
        it('returnerer riktig for barn uten fnr', () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnr;
            expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
        });
        it('returnerer riktig for barn uten fnr - annen relasjon', () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnrAnnenRelasjon;
            expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
        });
        it('returnerer riktig for barn uten fnr -  bor i utlandet', () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnrUtland;
            expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(søknadsdata);
        });
    });
});

describe('getOmBarnetFormInitialValues', () => {
    describe('Uten søknadsdata', () => {
        it('returnerer defaultFormValues hvis hverken formValues eller søknadsdata er sendt inn', () => {
            expect(getOmBarnetFormInitialValues(undefined, undefined)).toEqual(omBarnetFormDefaultValues);
        });
        it('returnerer formValues hvis disse er sendt inn', () => {
            const { formValues, søknadsdata } = testdata.registrertBarn;
            expect(getOmBarnetFormInitialValues(søknadsdata, formValues)).toEqual(formValues);
        });
    });
    describe('Med søknadsdata', () => {
        it(`returnerer riktig formValues for ${Variant.registrertBarn}`, () => {
            const { formValues, søknadsdata } = testdata.registrertBarn;
            expect(getOmBarnetFormInitialValues(søknadsdata)).toEqual({ ...omBarnetFormDefaultValues, ...formValues });
        });
        it(`returnerer riktig formValues for ${Variant.annetBarnMor}`, () => {
            const { formValues, søknadsdata } = testdata.annetBarnMor;
            expect(getOmBarnetFormInitialValues(søknadsdata)).toEqual({ ...omBarnetFormDefaultValues, ...formValues });
        });
        it(`returnerer riktig formValues for ${Variant.annetBarnFar}`, () => {
            const { formValues, søknadsdata } = testdata.annetBarnFar;
            expect(getOmBarnetFormInitialValues(søknadsdata)).toEqual({ ...omBarnetFormDefaultValues, ...formValues });
        });
        it(`returnerer riktig formValues for ${Variant.annetBarnUtenFnr}`, () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnr;
            expect(getOmBarnetFormInitialValues(søknadsdata)).toEqual({ ...omBarnetFormDefaultValues, ...formValues });
        });
        it(`returnerer riktig formValues for ${Variant.annetBarnUtenFnrAnnenRelasjon}`, () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnrAnnenRelasjon;
            expect(getOmBarnetFormInitialValues(søknadsdata)).toEqual({ ...omBarnetFormDefaultValues, ...formValues });
        });
        it(`returnerer riktig formValues for ${Variant.annetBarnUtenFnrUtland}`, () => {
            const { formValues, søknadsdata } = testdata.annetBarnUtenFnrUtland;
            expect(getOmBarnetFormInitialValues(søknadsdata)).toEqual({ ...omBarnetFormDefaultValues, ...formValues });
        });
    });
});
