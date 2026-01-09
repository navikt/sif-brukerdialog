import { RegistrertBarn } from '@navikt/sif-common-api';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

import { ÅrsakBarnetManglerIdentitetsnummer, RelasjonTilBarnet } from './';

export interface RelasjonTilBarnetSøknadsdataBase {
    relasjonTilBarnet: RelasjonTilBarnet;
    relasjonTilBarnetBeskrivelse?: string;
}

interface OmBarnetFormSøknadsdata_AnnetBarn extends RelasjonTilBarnetSøknadsdataBase {
    type: 'annetBarn';
    barnetsNavn: string;
    barnetsFødselsdato: Date;
    barnetsFødselsnummer: string;
}

interface OmBarnetFormSøknadsdata_BarnUtenFnr extends RelasjonTilBarnetSøknadsdataBase {
    type: 'annetBarnUtenFnr';
    barnetsNavn: string;
    årsakManglerIdentitetsnummer: ÅrsakBarnetManglerIdentitetsnummer;
    barnetsFødselsdato: Date;
    fødselsattest: Vedlegg[];
}

export interface OmBarnetFormSøknadsdata_RegistrertBarn {
    type: 'registrerteBarn';
    registrertBarn: RegistrertBarn;
}

export type OmBarnetFormSøknadsdata =
    | OmBarnetFormSøknadsdata_RegistrertBarn
    | OmBarnetFormSøknadsdata_AnnetBarn
    | OmBarnetFormSøknadsdata_BarnUtenFnr;
