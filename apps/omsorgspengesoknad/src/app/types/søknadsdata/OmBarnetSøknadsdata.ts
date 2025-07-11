import { BarnOppslag } from '@navikt/sif-common-query';
import { BarnSammeAdresse } from '../BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

interface OmBarnetSøknadsdata_registrertBarn {
    type: 'registrertBarn';
    registrertBarn: BarnOppslag;
    sammeAdresse: BarnSammeAdresse;
    kroniskEllerFunksjonshemming: boolean;
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
}

interface OmBarnetSøknadsdata_annetBarn {
    type: 'annetBarn';
    søknadenGjelderEtAnnetBarn: true;
    barnetsFødselsnummer: string;
    barnetsFødselsdato: string;
    barnetsNavn: string;
    søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet;
    sammeAdresse: BarnSammeAdresse;
    kroniskEllerFunksjonshemming: boolean;
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
}

export type OmBarnetSøknadsdata = OmBarnetSøknadsdata_annetBarn | OmBarnetSøknadsdata_registrertBarn;
