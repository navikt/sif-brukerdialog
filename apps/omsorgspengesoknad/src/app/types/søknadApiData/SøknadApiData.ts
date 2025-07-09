import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';
import { BarnSammeAdresse } from '../BarnSammeAdresse';
import { OmsorgspengerKroniskSyktBarnSøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { ISODate } from '@navikt/sif-common-utils';

export interface BarnToSendToApi {
    navn: string;
    norskIdentifikator: string | null;
    aktørId: string | null;
    fødselsdato?: ISODate;
}

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
