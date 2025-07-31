import { VelgBarn_AnnetBarnValue } from '@navikt/sif-common-forms-ds';
import { BarnRelasjon, ÅrsakManglerIdentitetsnummer } from '../../../types';
import { OmBarnetFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { extractBarnSøknadsdata } from '../extractBarnSøknadsdata';

const formValues: OmBarnetFormValues = {
    barnetsNavn: '',
    barnetsFødselsnummer: '',
    barnetSøknadenGjelder: '1',
    barnetHarIkkeFnr: false,
    fødselsattest: [],
};

describe('extractBarnetSøknadsdata', () => {
    describe('Barn fra Api', () => {
        it('returnerer registrerteBarn dersom bruker valgte registrerete barnet', () => {
            const result = extractBarnSøknadsdata(formValues);
            expect(result).toBeDefined();
            expect(result?.type).toEqual('registrerteBarn');
        });
    });

    describe('Annet Barn med fnr', () => {
        it('returnerer annetBarn dersom bruker la til barn med fnr', () => {
            const result = extractBarnSøknadsdata({
                ...formValues,
                barnetSøknadenGjelder: VelgBarn_AnnetBarnValue,
                barnetsNavn: 'Test Testen',
                barnetsFødselsnummer: '12345678911',
                relasjonTilBarnet: BarnRelasjon.FAR,
            });
            expect(result).toBeDefined();
            expect(result?.type).toEqual('annetBarn');
        });
    });

    describe('Annet Barn uten fnr', () => {
        it('returnerer annetBarnUtenFnr dersom bruker la til barn uten fnr', () => {
            const result = extractBarnSøknadsdata({
                ...formValues,
                barnetSøknadenGjelder: VelgBarn_AnnetBarnValue,
                barnetsNavn: 'Test Testen',
                barnetHarIkkeFnr: true,
                barnetsFødselsnummer: '',
                barnetsFødselsdato: '2020.12.12',
                årsakManglerIdentitetsnummer: ÅrsakManglerIdentitetsnummer.BARNET_BOR_I_UTLANDET,
                relasjonTilBarnet: BarnRelasjon.FAR,
                fødselsattest: [],
            });
            expect(result).toBeDefined();
            expect(result?.type).toEqual('annetBarnUtenFnr');
        });
    });

    describe('Tomt barnet i søknadsdata', () => {
        it('returnerer undefined med tomt barnet', () => {
            const result = extractBarnSøknadsdata({
                ...formValues,
                barnetSøknadenGjelder: VelgBarn_AnnetBarnValue,
                barnetsNavn: 'Test Testen',
                barnetHarIkkeFnr: true,
                barnetsFødselsnummer: '',
                barnetsFødselsdato: '',
                årsakManglerIdentitetsnummer: undefined,
                relasjonTilBarnet: BarnRelasjon.FAR,
            });

            expect(result).toBeUndefined();
        });
    });
});
