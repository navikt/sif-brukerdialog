import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { OmBarnetFormFields, RelasjonTilBarnet, ÅrsakBarnetManglerIdentitetsnummer } from '.';

export interface OmBarnetFormValues {
    [OmBarnetFormFields.barnetSøknadenGjelder]?: string;
    [OmBarnetFormFields.søknadenGjelderEtAnnetBarn]?: boolean;
    [OmBarnetFormFields.barnetsNavn]?: string;
    [OmBarnetFormFields.barnetsFødselsnummer]?: string;
    [OmBarnetFormFields.barnetsFødselsdato]?: string;
    [OmBarnetFormFields.barnetHarIkkeFnr]?: boolean;
    [OmBarnetFormFields.relasjonTilBarnet]?: RelasjonTilBarnet;
    [OmBarnetFormFields.relasjonTilBarnetBeskrivelse]?: string;
    [OmBarnetFormFields.årsakManglerIdentitetsnummer]?: ÅrsakBarnetManglerIdentitetsnummer;
    [OmBarnetFormFields.fødselsattest]?: Vedlegg[];
}
