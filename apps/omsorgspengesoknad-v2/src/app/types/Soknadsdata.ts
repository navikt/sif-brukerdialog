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

export type LegeerklæringSøknadsdata = Record<string, never>;

export type DeltBostedSøknadsdata = Record<string, never>;

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.OM_BARNET]?: OmBarnetSøknadsdata;
    [SøknadStepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [SøknadStepId.DELT_BOSTED]?: DeltBostedSøknadsdata;
}
