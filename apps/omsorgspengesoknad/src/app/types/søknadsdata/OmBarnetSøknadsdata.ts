import { BarnSammeAdresse } from '../BarnSammeAdresse';
import { RegistrertBarn } from '../RegistrertBarn';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

interface OmBarnetSøknadsdata_registrertBarn {
    type: 'registrertBarn';
    registrertBarn: RegistrertBarn;
    sammeAdresse: BarnSammeAdresse;
    kroniskEllerFunksjonshemming: boolean;
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
}

export type OmBarnetSøknadsdata = OmBarnetSøknadsdata_annetBarn | OmBarnetSøknadsdata_registrertBarn;
