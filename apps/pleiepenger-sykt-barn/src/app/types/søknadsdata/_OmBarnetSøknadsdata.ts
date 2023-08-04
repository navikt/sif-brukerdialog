import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { BarnRelasjon } from '../_BarnRelasjon';
import { ÅrsakManglerIdentitetsnummer } from '../_ÅrsakManglerIdentitetsnummer';

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
    fødselsattest: Attachment[];
}

export type OmBarnetSøknadsdata =
    | OmBarnetRegistrerteSøknadsdata
    | OmBarnetAnnetSøknadsdata
    | OmBarnetAnnetUtenFnrSøknadsdata;
