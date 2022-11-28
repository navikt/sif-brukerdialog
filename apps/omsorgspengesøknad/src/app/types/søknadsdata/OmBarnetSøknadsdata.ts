import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

interface OmBarnetSøknadsdata_registrertBarn {
    type: 'registrertBarn';
    registrertBarn: string;
}

interface OmBarnetSøknadsdata_annetBarn {
    type: 'annetBarn';
    søknadenGjelderEtAnnetBarn: true;
    barnetsFødselsnummer: string;
    barnetsNavn: string;
    søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet;
}

export type OmBarnetSøknadsdata = OmBarnetSøknadsdata_annetBarn | OmBarnetSøknadsdata_registrertBarn;
