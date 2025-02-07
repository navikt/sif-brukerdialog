import { RegistrertBarn } from '@navikt/sif-common-api';
import { BarnSammeAdresse } from '../BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

interface OmBarnetSøknadsdata_registrertBarn {
    type: 'registrertBarn';
    registrertBarn: RegistrertBarn;
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
