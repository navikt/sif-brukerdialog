import { RegistrertBarn } from '@navikt/sif-common-api';
import { ÅrsakBarnetManglerIdentitetsnummer, OmBarnetFormValues, RelasjonTilBarnet } from '../types';
import { getOmBarnetSøknadsdataFromFormValues } from './omBarnetFormUtils';
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

describe('getOmBarnetSøknadsdataFromFormValues', () => {
    it('søknaden gjelder et registrert barn', () => {
        const formValues: OmBarnetFormValues = {
            barnetSøknadenGjelder: '2811762539343',
        };
        const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
            type: 'registrerteBarn',
            aktørId: '2811762539343',
            registrertBarn: barn1,
        };
        expect(getOmBarnetSøknadsdataFromFormValues(formValues, registrerteBarn)).toEqual(forventetSøknadsdata);
    });
    describe('søknaden gjelder et annet barn med fnr', () => {
        const formValues: OmBarnetFormValues = {
            søknadenGjelderEtAnnetBarn: true,
            barnetsFødselsnummer: '2811762539343',
            barnetsNavn: 'Navn',
            relasjonTilBarnet: RelasjonTilBarnet.MOR,
            relasjonTilBarnetBeskrivelse: 'Beskrivelse',
        };
        it('returnerer riktig for barn med fnr - MOR', () => {
            const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
                type: 'annetBarn',
                barnetsFødselsnummer: '2811762539343',
                relasjonTilBarnet: RelasjonTilBarnet.MOR,
                barnetsNavn: 'Navn',
            };
            const result = getOmBarnetSøknadsdataFromFormValues({ ...formValues }, registrerteBarn);
            expect(result).toEqual(forventetSøknadsdata);
        });
        it('returnerer riktig for barn med fnr - FAR', () => {
            const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
                type: 'annetBarn',
                barnetsFødselsnummer: '2811762539343',
                relasjonTilBarnet: RelasjonTilBarnet.FAR,
                barnetsNavn: 'Navn',
            };
            const result = getOmBarnetSøknadsdataFromFormValues(
                { ...formValues, relasjonTilBarnet: RelasjonTilBarnet.FAR },
                registrerteBarn,
            );
            expect(result).toEqual(forventetSøknadsdata);
        });
        it('returnerer riktig for barn med fnr - Annet', () => {
            const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
                type: 'annetBarn',
                barnetsFødselsnummer: '2811762539343',
                relasjonTilBarnet: RelasjonTilBarnet.ANNET,
                barnetsNavn: 'Navn',
                relasjonTilBarnetBeskrivelse: 'Beskrivelse',
            };
            const result = getOmBarnetSøknadsdataFromFormValues(
                { ...formValues, relasjonTilBarnet: RelasjonTilBarnet.ANNET },
                registrerteBarn,
            );
            expect(result).toEqual(forventetSøknadsdata);
        });
    });
    describe('søknaden gjelder et annet barn uten fnr', () => {
        const formValues: OmBarnetFormValues = {
            barnetHarIkkeFnr: true,
            søknadenGjelderEtAnnetBarn: true,
            barnetsFødselsdato: '2020-01-01',
            barnetsNavn: 'Navn',
            fødselsattest: [],
            relasjonTilBarnet: RelasjonTilBarnet.MEDMOR,
            relasjonTilBarnetBeskrivelse: 'Beskrivelse',
            årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT,
        };

        it('returnerer riktig for barn uten fnr', () => {
            const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
                type: 'annetBarnUtenFnr',
                fødselsattest: [],
                barnetsFødselsdato: '2020-01-01',
                barnetsNavn: 'Navn',
                relasjonTilBarnet: RelasjonTilBarnet.MEDMOR,
                årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT,
            };
            const result = getOmBarnetSøknadsdataFromFormValues({ ...formValues }, registrerteBarn);
            expect(result).toEqual(forventetSøknadsdata);
        });
        it('returnerer riktig for barn uten fnr - annen relasjon', () => {
            const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
                type: 'annetBarnUtenFnr',
                fødselsattest: [],
                barnetsFødselsdato: '2020-01-01',
                barnetsNavn: 'Navn',
                relasjonTilBarnet: RelasjonTilBarnet.ANNET,
                relasjonTilBarnetBeskrivelse: 'Beskrivelse',
                årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.NYFØDT,
            };
            const result = getOmBarnetSøknadsdataFromFormValues(
                {
                    ...formValues,
                    relasjonTilBarnet: RelasjonTilBarnet.ANNET,
                    relasjonTilBarnetBeskrivelse: 'Beskrivelse',
                },
                registrerteBarn,
            );
            expect(result).toEqual(forventetSøknadsdata);
        });
        it('returnerer riktig for barn uten fnr -  bor i utlandet', () => {
            const forventetSøknadsdata: OmBarnetFormSøknadsdata = {
                type: 'annetBarnUtenFnr',
                fødselsattest: [{} as any],
                barnetsFødselsdato: '2020-01-01',
                barnetsNavn: 'Navn',
                relasjonTilBarnet: RelasjonTilBarnet.ANNET,
                relasjonTilBarnetBeskrivelse: 'Beskrivelse',
                årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET,
            };
            const result = getOmBarnetSøknadsdataFromFormValues(
                {
                    ...formValues,
                    relasjonTilBarnet: RelasjonTilBarnet.ANNET,
                    årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET,
                    relasjonTilBarnetBeskrivelse: 'Beskrivelse',
                    fødselsattest: [{} as any],
                },
                registrerteBarn,
            );
            expect(result).toEqual(forventetSøknadsdata);
        });
    });
});
