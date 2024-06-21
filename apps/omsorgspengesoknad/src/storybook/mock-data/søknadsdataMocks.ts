import { RegistrerteBarnMock } from '.';
import { BarnSammeAdresse } from '../../app/types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../../app/types/SøkersRelasjonTilBarnet';
import { Søknadsdata } from '../../app/types/søknadsdata/Søknadsdata';

const registrertBarn = RegistrerteBarnMock[0];

const komplett_annetBarnFarDeltBosted: Søknadsdata = {
    omBarnet: {
        type: 'annetBarn',
        søknadenGjelderEtAnnetBarn: true,
        barnetsFødselsnummer: '12312312312',
        barnetsNavn: 'Navn på barnet',
        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FAR,
        kroniskEllerFunksjonshemming: true,
        høyereRisikoForFravær: true,
        høyereRisikoForFraværBeskrivelse: 'Beskrivelse av høyere risiko for fravær',
        sammeAdresse: BarnSammeAdresse.JA_DELT_BOSTED,
        barnetsFødselsdato: '2020-01-01',
    },
    deltBosted: {
        vedlegg: [{ file: { name: 'file.jpg' } as any, url: '/vedlegg', uploaded: true, pending: false }],
    },
    legeerklaering: { vedlegg: [] },
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
};

const komplett_registrertBarnIngenLegeerklæring: Søknadsdata = {
    omBarnet: {
        registrertBarn,
        kroniskEllerFunksjonshemming: false,
        sammeAdresse: BarnSammeAdresse.NEI,
        type: 'registrertBarn',
    },
    legeerklaering: { vedlegg: [] },
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
};

const komplett_annetBarnAnnenAdresse: Søknadsdata = {
    omBarnet: {
        type: 'annetBarn',
        søknadenGjelderEtAnnetBarn: true,
        barnetsFødselsnummer: '12312312312',
        barnetsNavn: 'Navn på barnet',
        barnetsFødselsdato: '2020-01-01',
        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FAR,
        kroniskEllerFunksjonshemming: false,
        sammeAdresse: BarnSammeAdresse.NEI,
    },
    legeerklaering: { vedlegg: [] },
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
};

export const søknadsdataMocks = {
    tom: {},
    komplett_registrertBarnIngenLegeerklæring,
    komplett_annetBarnFarDeltBosted,
    komplett_annetBarnAnnenAdresse,
};
