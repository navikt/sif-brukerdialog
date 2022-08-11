import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { ISODate } from '@navikt/sif-common-utils/lib';
import { Arbeidssituasjon, Mottaker } from './SoknadFormData';
import { Søknadstype } from './Soknadstype';

export interface ApiBarn {
    identitetsnummer?: string;
    aktørId?: string;
    fødselsdato: ISODate;
    navn: string;
    aleneOmOmsorgen?: boolean;
    utvidetRett: boolean;
}
export interface BarnStepApiData {
    harAleneomsorg: boolean;
    harUtvidetRett: boolean;
    barn: ApiBarn[];
}

/** Ektefelle/samboer */
interface SøknadApiDataOverføring {
    mottakerType: Mottaker;
    antallDagerSomSkalOverføres: number;
}
/** Samværsforelder */
interface SøknadApiDataFordeling {
    mottakerType: Mottaker;
    samværsavtale: string[];
}
interface SøknadApiDataKorona {
    antallDagerSomSkalOverføres: number;
}

export enum SoknadApiDataField {
    'id' = 'id',
    'type' = 'type',
    'språk' = 'språk',
    'harForståttRettigheterOgPlikter' = 'harForståttRettigheterOgPlikter',
    'harBekreftetOpplysninger' = 'harBekreftetOpplysninger',
    'mottakerFnr' = 'mottakerFnr',
    'mottakerNavn' = 'mottakerNavn',
    'harAleneomsorg' = 'harAleneomsorg',
    'harUtvidetRett' = 'harUtvidetRett',
    'erYrkesaktiv' = 'erYrkesaktiv',
    'arbeiderINorge' = 'arbeiderINorge',
    'arbeidssituasjon' = 'arbeidssituasjon',
    'antallDagerBruktEtter1Juli' = 'antallDagerBruktEtter1Juli',
    'barn' = 'barn',
    'korona' = 'korona',
    'fordeling' = 'fordeling',
    'overføring' = 'overføring',
}
export interface SoknadApiDataFelles {
    [SoknadApiDataField.id]: string;
    [SoknadApiDataField.type]: Søknadstype;
    [SoknadApiDataField.språk]: Locale;
    [SoknadApiDataField.harForståttRettigheterOgPlikter]: boolean;
    [SoknadApiDataField.harBekreftetOpplysninger]: boolean;
    [SoknadApiDataField.mottakerFnr]: string;
    [SoknadApiDataField.mottakerNavn]: string;
    [SoknadApiDataField.harAleneomsorg]: boolean;
    [SoknadApiDataField.harUtvidetRett]: boolean;
    [SoknadApiDataField.erYrkesaktiv]: boolean;
    [SoknadApiDataField.arbeiderINorge]: boolean;
    [SoknadApiDataField.arbeidssituasjon]: Arbeidssituasjon[];
    [SoknadApiDataField.antallDagerBruktEtter1Juli]?: number;
    [SoknadApiDataField.barn]: ApiBarn[];
}

export interface SøknadKoronaoverføringApiData extends SoknadApiDataFelles {
    [SoknadApiDataField.type]: Søknadstype.koronaoverføring;
    [SoknadApiDataField.korona]: SøknadApiDataKorona;
}
export const isSøknadKoronaoverføring = (søknad: any): søknad is SøknadKoronaoverføringApiData => {
    return søknad.type === Søknadstype.koronaoverføring;
};
export interface SøknadOverføringApiData extends SoknadApiDataFelles {
    [SoknadApiDataField.type]: Søknadstype.overføring;
    [SoknadApiDataField.overføring]: SøknadApiDataOverføring;
}
export const isSøknadOverføring = (søknad: any): søknad is SøknadOverføringApiData => {
    return søknad.type === Søknadstype.overføring;
};
export interface SøknadFordelingApiData extends SoknadApiDataFelles {
    [SoknadApiDataField.type]: Søknadstype.fordeling;
    [SoknadApiDataField.fordeling]: SøknadApiDataFordeling;
}
export const isSøknadFordeling = (søknad: any): søknad is SøknadFordelingApiData => {
    return søknad.type === Søknadstype.fordeling;
};

export type SoknadApiData = SøknadKoronaoverføringApiData | SøknadFordelingApiData | SøknadOverføringApiData;
