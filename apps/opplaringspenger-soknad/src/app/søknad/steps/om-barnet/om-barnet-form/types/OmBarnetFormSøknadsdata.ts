import { RegistrertBarn } from '@navikt/sif-common-api';
import { RelasjonTilBarnet, ÅrsakBarnetManglerIdentitetsnummer } from './';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

export interface RelasjonTilBarnetSøknadsdataBase {
    relasjonTilBarnet: RelasjonTilBarnet;
    relasjonTilBarnetBeskrivelse?: string;
}

interface OmBarnetFormSøknadsdata_AnnetBarn extends RelasjonTilBarnetSøknadsdataBase {
    type: 'annetBarn';
    barnetsNavn: string;
    barnetsFødselsnummer: string;
}

interface OmBarnetFormSøknadsdata_BarnUtenFnr extends RelasjonTilBarnetSøknadsdataBase {
    type: 'annetBarnUtenFnr';
    barnetsNavn: string;
    årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer;
    barnetsFødselsdato: string;
    fødselsattest: Vedlegg[];
}

export interface OmBarnetFormSøknadsdata_RegistrertBarn {
    type: 'registrerteBarn';
    aktørId: string;
    registrertBarn: RegistrertBarn;
}

export type OmBarnetFormSøknadsdata =
    | OmBarnetFormSøknadsdata_RegistrertBarn
    | OmBarnetFormSøknadsdata_AnnetBarn
    | OmBarnetFormSøknadsdata_BarnUtenFnr;
