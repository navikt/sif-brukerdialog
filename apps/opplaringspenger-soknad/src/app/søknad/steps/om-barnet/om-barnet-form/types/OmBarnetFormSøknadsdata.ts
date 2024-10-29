import { RegistrertBarn } from '@navikt/sif-common-api';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { RelasjonTilBarnet, ÅrsakBarnetManglerIdentitetsnummer } from './';

export interface RelasjonTilBarnetSøknadsdataBase {
    relasjonTilBarnet?: RelasjonTilBarnet;
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
    fødselsattest: Attachment[];
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
