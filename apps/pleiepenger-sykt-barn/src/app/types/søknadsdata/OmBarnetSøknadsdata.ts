import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { BarnRelasjon } from '../BarnRelasjon';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';

export interface OmBarnetRegistrerteSøknadsdata {
    type: 'registrerteBarn';
    aktørId: string;
}

export interface BarnRelasjonSøknadsdata {
    relasjonTilBarnet?: BarnRelasjon;
    relasjonTilBarnetBeskrivelse?: string;
}

export interface OmBarnetAnnetSøknadsdata extends BarnRelasjonSøknadsdata {
    type: 'annetBarn';
    barnetsNavn: string;
    barnetsFødselsnummer: string;
}

export interface OmBarnetAnnetUtenFnrSøknadsdata extends BarnRelasjonSøknadsdata {
    type: 'annetBarnUtenFnr';
    barnetsNavn: string;
    årsakManglerIdentitetsnummer: ÅrsakManglerIdentitetsnummer;
    barnetsFødselsdato: string;
    fødselsattest: Vedlegg[];
}

export type OmBarnetSøknadsdata =
    | OmBarnetRegistrerteSøknadsdata
    | OmBarnetAnnetSøknadsdata
    | OmBarnetAnnetUtenFnrSøknadsdata;
