import {
    ApiBarn,
    isSøknadFordeling,
    isSøknadKoronaoverføring,
    isSøknadOverføring,
    SoknadApiData,
    SoknadApiDataFelles,
    SoknadApiDataField,
} from '../types/SoknadApiData';

const harAleneomsorgForBarn = (apiData: SoknadApiData): boolean =>
    apiData.barn.filter((b: ApiBarn) => b.aleneOmOmsorgen === true && (b.aktørId || b.identitetsnummer)).length > 0;

type ApiDataVerification<ApiData> = (values: ApiData) => boolean;

interface SoknadApiVerification<ApiData> {
    [key: string]: ApiDataVerification<ApiData>;
}

const verifyKoronaoverføringApiData = (apiValues: SoknadApiData): boolean => {
    if (isSøknadKoronaoverføring(apiValues)) {
        const { korona } = apiValues;
        return korona !== undefined && korona.antallDagerSomSkalOverføres > 0;
    }
    return true;
};

const verifyFordelingApiData = (apiValues: SoknadApiData): boolean => {
    if (isSøknadFordeling(apiValues)) {
        const { fordeling } = apiValues;
        return fordeling !== undefined && harAleneomsorgForBarn(apiValues) && fordeling.mottakerType !== undefined;
    }
    return true;
};

const verifyOverføringApiData = (apiValues: SoknadApiData): boolean => {
    if (isSøknadOverføring(apiValues)) {
        const { overføring } = apiValues;
        return (
            overføring !== undefined &&
            harAleneomsorgForBarn(apiValues) &&
            overføring.antallDagerSomSkalOverføres !== undefined &&
            overføring.antallDagerSomSkalOverføres >= 0 &&
            overføring.mottakerType !== undefined
        );
    }
    return true;
};

export const SoknadApiFellesVerification: SoknadApiVerification<SoknadApiDataFelles> = {
    [SoknadApiDataField.id]: ({ id }) => id !== undefined,
    [SoknadApiDataField.type]: ({ type }) => type !== undefined,
    [SoknadApiDataField.harForståttRettigheterOgPlikter]: ({ harForståttRettigheterOgPlikter }) =>
        harForståttRettigheterOgPlikter === true,
    [SoknadApiDataField.mottakerFnr]: ({ mottakerFnr }) => mottakerFnr !== undefined,
    [SoknadApiDataField.mottakerNavn]: ({ mottakerNavn }) => mottakerNavn !== undefined,
    [SoknadApiDataField.harAleneomsorg]: ({ harAleneomsorg }) => harAleneomsorg !== undefined,
    [SoknadApiDataField.harUtvidetRett]: ({ harUtvidetRett }) => harUtvidetRett !== undefined,
    [SoknadApiDataField.erYrkesaktiv]: ({ erYrkesaktiv }) => erYrkesaktiv !== undefined,
    [SoknadApiDataField.arbeiderINorge]: ({ arbeiderINorge }) => arbeiderINorge !== undefined,
    [SoknadApiDataField.arbeidssituasjon]: ({ arbeidssituasjon }) => arbeidssituasjon !== undefined,
    [SoknadApiDataField.antallDagerBruktEtter1Juli]: ({ antallDagerBruktEtter1Juli }) =>
        antallDagerBruktEtter1Juli === undefined || antallDagerBruktEtter1Juli >= 0,
    [SoknadApiDataField.barn]: ({ barn }) => barn !== undefined && barn.length > 0,
    [SoknadApiDataField.korona]: verifyKoronaoverføringApiData,
    [SoknadApiDataField.fordeling]: verifyFordelingApiData,
    [SoknadApiDataField.overføring]: verifyOverføringApiData,
};

const runVerification = (keys: string[], values: SoknadApiDataFelles): SoknadApiDataField[] => {
    const errors: SoknadApiDataField[] = [];
    keys.forEach((key: SoknadApiDataField) => {
        const func = SoknadApiFellesVerification[key];
        if (func && func(values) === false) {
            errors.push(key);
        }
    });
    return errors;
};

export const verifySoknadApiData = (apiData?: SoknadApiData): boolean => {
    if (!apiData) {
        return false;
    }
    const errors = runVerification(Object.keys(SoknadApiDataField), apiData);

    return errors.length === 0;
};
