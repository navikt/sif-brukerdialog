import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { BaseSøknadsdata } from '@sif/soknad/types';
import { PersistedVedlegg } from '@sif/soknad-forms';

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
