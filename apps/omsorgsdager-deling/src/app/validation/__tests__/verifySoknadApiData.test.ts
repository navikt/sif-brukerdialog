import {
    SoknadApiDataFelles,
    SøknadFordelingApiData,
    SøknadKoronaoverføringApiData,
    SøknadOverføringApiData,
} from '../../types/SoknadApiData';
import { Arbeidssituasjon, Mottaker } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Soknadstype';
import { verifySoknadApiData } from '../verifySoknadApiData';

const søknadFellesInfo: SoknadApiDataFelles = {
    id: '01EN0G1TQF4N58300JZ6V0NN22',
    type: Søknadstype.fordeling,
    språk: 'nb',
    harBekreftetOpplysninger: true,
    harForståttRettigheterOgPlikter: true,
    erYrkesaktiv: true,
    arbeiderINorge: true,
    arbeidssituasjon: [Arbeidssituasjon.selvstendigNæringsdrivende],
    mottakerFnr: '1234567891',
    mottakerNavn: 'sddfsdf',
    harAleneomsorg: true,
    harUtvidetRett: true,
    barn: [
        {
            navn: 'Filip Barne Carpenter',
            fødselsdato: '2003-01-01',
            aktørId: '1',
            aleneOmOmsorgen: true,
            utvidetRett: true,
        },
        {
            navn: 'Jason Mcmanus',
            fødselsdato: '2004-01-02',
            aktørId: '2',
            aleneOmOmsorgen: false,
            utvidetRett: false,
        },
    ],
};

const overføringSøknad: SøknadOverføringApiData = {
    ...søknadFellesInfo,
    type: Søknadstype.overføring,
    overføring: {
        antallDagerSomSkalOverføres: 1,
        mottakerType: Mottaker.ektefelle,
    },
};
const fordelingSøknad: SøknadFordelingApiData = {
    ...søknadFellesInfo,
    type: Søknadstype.fordeling,
    fordeling: {
        samværsavtale: [],
        mottakerType: Mottaker.ektefelle,
    },
};
const koronaSøknad: SøknadKoronaoverføringApiData = {
    ...søknadFellesInfo,
    type: Søknadstype.koronaoverføring,
    korona: {
        antallDagerSomSkalOverføres: 1,
    },
};

describe('verifySoknadApiData', () => {
    it('fails on undefined data', () => {
        expect(verifySoknadApiData(undefined)).toBeFalsy();
    });
    it('accepts valid koronasøknad', () => {
        expect(verifySoknadApiData(koronaSøknad)).toBeTruthy();
    });
    it('accepts valid fordelingssøknad', () => {
        expect(verifySoknadApiData(fordelingSøknad)).toBeTruthy();
    });
    it('accepts valid overføringssøknad', () => {
        expect(verifySoknadApiData(overføringSøknad)).toBeTruthy();
    });
});
