import { StepFormValues } from '@sif/soknad/types';

import { BarnSammeAdresse } from '@app/types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '@app/types/SøkersRelasjonTilBarnet';
import { YesOrNo } from '@sif/rhf';

export const ANNET_BARN = 'ANNET_BARN';

export enum OmBarnetFormFields {
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
    barnetsFødselsdato = 'barnetsFødselsdato',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetsNavn = 'barnetsNavn',
    søkersRelasjonTilBarnet = 'søkersRelasjonTilBarnet',
    sammeAdresse = 'sammeAdresse',
    kroniskEllerFunksjonshemming = 'kroniskEllerFunksjonshemming',
    høyereRisikoForFravær = 'høyereRisikoForFravær',
    høyereRisikoForFraværBeskrivelse = 'høyereRisikoForFraværBeskrivelse',
}

export interface OmBarnetFormValues extends StepFormValues {
    [OmBarnetFormFields.barnetSøknadenGjelder]?: string;
    [OmBarnetFormFields.barnetsFødselsdato]: string;
    [OmBarnetFormFields.barnetsFødselsnummer]: string;
    [OmBarnetFormFields.barnetsNavn]: string;
    [OmBarnetFormFields.søkersRelasjonTilBarnet]?: SøkersRelasjonTilBarnet;
    [OmBarnetFormFields.sammeAdresse]?: BarnSammeAdresse;
    [OmBarnetFormFields.kroniskEllerFunksjonshemming]?: YesOrNo;
    [OmBarnetFormFields.høyereRisikoForFravær]?: YesOrNo;
    [OmBarnetFormFields.høyereRisikoForFraværBeskrivelse]?: string;
}
