import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';
import { BarnSammeAdresse } from '../BarnSammeAdresse';
import { Barn, OmsorgspengerKroniskSyktBarnSøknad } from '@navikt/k9-brukerdialog-prosessering-api';

export type BarnToSendToApi = Barn & {
    navn: string;
    norskIdentifikator: string;
    _erRegistrertBarn: boolean;
};

export interface SøknadApiData
    extends Omit<OmsorgspengerKroniskSyktBarnSøknad, 'barn' | 'relasjonTilBarnet' | 'sammeAdresse'> {
    barn: BarnToSendToApi;
    relasjonTilBarnet?: SøkersRelasjonTilBarnet;
    sammeAdresse?: BarnSammeAdresse;
}

export type DataBruktTilUtledningAnnetData = Pick<
    SøknadApiData,
    'sammeAdresse' | 'relasjonTilBarnet' | 'høyereRisikoForFravær' | 'høyereRisikoForFraværBeskrivelse'
>;

export type OmBarnetApiData = Pick<
    SøknadApiData,
    | 'barn'
    | 'relasjonTilBarnet'
    | 'kroniskEllerFunksjonshemming'
    | 'relasjonTilBarnet'
    | 'kroniskEllerFunksjonshemming'
    | 'sammeAdresse'
    | 'høyereRisikoForFravær'
    | 'høyereRisikoForFraværBeskrivelse'
>;
