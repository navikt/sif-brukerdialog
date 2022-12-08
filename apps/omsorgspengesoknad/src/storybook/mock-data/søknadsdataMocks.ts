import { RegistrerteBarnMock } from '.';
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
        kroniskEllerFunksjonshemming: false,
        sammeAdresse: false,
    },
    legeerklæring: { vedlegg: [] },
    deltBosted: {
        vedlegg: [{ file: { name: 'file.jpg' } as any, url: '/vedlegg', uploaded: true, pending: false }],
    },
    harForståttRettigheterOgPlikter: true,
};

const komplett_registrertBarnIngenLegeerklæring: Søknadsdata = {
    omBarnet: {
        registrertBarn,
        kroniskEllerFunksjonshemming: false,
        sammeAdresse: false,
        type: 'registrertBarn',
    },
    legeerklæring: { vedlegg: [] },
    harForståttRettigheterOgPlikter: true,
};

const komplett_annetBarnAnnenAdresse: Søknadsdata = {
    omBarnet: {
        type: 'annetBarn',
        søknadenGjelderEtAnnetBarn: true,
        barnetsFødselsnummer: '12312312312',
        barnetsNavn: 'Navn på barnet',
        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FAR,
        kroniskEllerFunksjonshemming: false,
        sammeAdresse: false,
    },
    legeerklæring: { vedlegg: [] },
    harForståttRettigheterOgPlikter: true,
};

export const søknadsdataMocks = {
    tom: {},
    komplett_registrertBarnIngenLegeerklæring,
    komplett_annetBarnFarDeltBosted,
    komplett_annetBarnAnnenAdresse,
};
