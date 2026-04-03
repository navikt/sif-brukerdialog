import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { BaseSøknadsdata } from '@sif/soknad/types';

import { SøknadStepId } from '../setup/config/SoknadStepId';
import { BarnSammeAdresse } from './BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from './SøkersRelasjonTilBarnet';

interface OmBarnetSøknadsdata_RegistrertBarn {
    type: 'registrertBarn';
    registrertBarn: RegistrertBarn;
    sammeAdresse: BarnSammeAdresse;
    kroniskEllerFunksjonshemming: boolean;
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
}

interface OmBarnetSøknadsdata_AnnetBarn {
    type: 'annetBarn';
    barnetsFødselsnummer: string;
    barnetsFødselsdato: string;
    barnetsNavn: string;
    søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet;
    sammeAdresse: BarnSammeAdresse;
    kroniskEllerFunksjonshemming: boolean;
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
}

export type OmBarnetSøknadsdata = OmBarnetSøknadsdata_RegistrertBarn | OmBarnetSøknadsdata_AnnetBarn;

export interface PersistedVedlegg {
    id: string;
    url: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

export interface LegeerklæringSøknadsdata {
    vedlegg: PersistedVedlegg[];
}

export interface DeltBostedSøknadsdata {
    samværsavtale: PersistedVedlegg[];
}

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.OM_BARNET]?: OmBarnetSøknadsdata;
    [SøknadStepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [SøknadStepId.DELT_BOSTED]?: DeltBostedSøknadsdata;
}
