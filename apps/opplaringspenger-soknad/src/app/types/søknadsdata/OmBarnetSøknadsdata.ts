import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { BarnRelasjon } from '../BarnRelasjon';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';
import { RegistrertBarn } from '@navikt/sif-common-api';

export interface OmBarnetRegistrerteSøknadsdata {
    type: 'registrerteBarn';
    aktørId: string;
    registrertBarn: RegistrertBarn;
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
