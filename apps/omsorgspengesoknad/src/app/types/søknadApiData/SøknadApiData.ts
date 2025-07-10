import { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';

export type BarnToSendToApi = omsorgspenger.Barn;

export interface SøknadApiData extends omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad {
    barn: BarnToSendToApi;
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
    | 'sammeAdresse'
    | 'høyereRisikoForFravær'
    | 'høyereRisikoForFraværBeskrivelse'
>;
