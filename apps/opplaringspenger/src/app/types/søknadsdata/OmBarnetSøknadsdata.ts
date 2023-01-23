import { RegistrertBarn } from '../RegistrertBarn';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

interface OmBarnetSøknadsdata_registrertBarn {
    type: 'registrertBarn';
    registrertBarn: RegistrertBarn;
    sammeAdresse: boolean;
    kroniskEllerFunksjonshemming: boolean;
}

interface OmBarnetSøknadsdata_annetBarn {
    type: 'annetBarn';
    søknadenGjelderEtAnnetBarn: true;
    barnetsFødselsnummer: string;
    barnetsNavn: string;
    søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet;
    sammeAdresse: boolean;
    kroniskEllerFunksjonshemming: boolean;
}

export type OmBarnetSøknadsdata = OmBarnetSøknadsdata_annetBarn | OmBarnetSøknadsdata_registrertBarn;
