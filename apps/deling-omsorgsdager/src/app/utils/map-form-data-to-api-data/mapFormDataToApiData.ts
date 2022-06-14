import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import { getLocaleForApi } from '@navikt/sif-common-core/lib/utils/localeUtils';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik/lib';
import {
    SoknadApiData,
    SoknadApiDataFelles,
    SøknadFordelingApiData,
    SøknadKoronaoverføringApiData,
    SøknadOverføringApiData,
} from '../../types/SoknadApiData';
import { Barn, SoknadFormData } from '../../types/SoknadFormData';
import { getSøknadstype, Søknadstype } from '../../types/Soknadstype';
import appSentryLogger from '../appSentryLogger';
import { mapBarnStepToApiData } from './mapBarnStepToApiData';
import { mapDinSituasjonToApiData } from './mapDinSituasjonToApiData';
import { mapMottakerToApiData } from './mapMottakerToApiData';

interface MapFormDataToApiDataValues {
    soknadId: string;
    locale: string;
    formData: SoknadFormData;
    registrerteBarn: Barn[];
}

const logErrorToSentry = (details: string): void => {
    appSentryLogger.logError('mapFormDataToApiData failed', details);
};

const getCommonApiData = ({
    soknadId,
    locale = 'nb',
    formData,
    registrerteBarn,
}: MapFormDataToApiDataValues): Omit<SoknadApiDataFelles, 'type'> | undefined => {
    const dinSituasjon = mapDinSituasjonToApiData(formData);
    if (dinSituasjon !== undefined) {
        return {
            id: soknadId,
            språk: getLocaleForApi(locale),
            harBekreftetOpplysninger: formData.harBekreftetOpplysninger,
            harForståttRettigheterOgPlikter: formData.harForståttRettigheterOgPlikter,
            ...dinSituasjon,
            ...mapMottakerToApiData(formData),
            ...mapBarnStepToApiData(formData, registrerteBarn),
        };
    }
    return undefined;
};
export const getSøknadKoronaoverføring = (
    values: MapFormDataToApiDataValues
): SøknadKoronaoverføringApiData | undefined => {
    const { antallDagerSomSkalOverføres } = values.formData;

    if (antallDagerSomSkalOverføres === undefined) {
        logErrorToSentry('getSøknadKoronaoverføring: antallDagerSomSkalOverføres === undefined');
        return undefined;
    }
    const antallDagerSomSkalOverføresNumber = getNumberFromNumberInputValue(antallDagerSomSkalOverføres);

    if (antallDagerSomSkalOverføresNumber === undefined) {
        logErrorToSentry('getSøknadKoronaoverføring: antallDagerSomSkalOverføresNumber === undefined');
        return undefined;
    }
    const commonApiData = getCommonApiData(values);

    if (commonApiData === undefined) {
        logErrorToSentry(
            'getSøknadKoronaoverføring: harBruktOmsorgsdagerEtter1Juli && antallDagerBruktEtter1Juli === undefined (konvertering feil)'
        );
        return undefined;
    }
    return {
        ...commonApiData,
        type: Søknadstype.koronaoverføring,
        korona: {
            antallDagerSomSkalOverføres: antallDagerSomSkalOverføresNumber,
        },
    };
};

export const getSøknadFordeling = (values: MapFormDataToApiDataValues): SøknadFordelingApiData | undefined => {
    const { mottakerType, samværsavtale } = values.formData;
    if (mottakerType === undefined) {
        logErrorToSentry('getSøknadFordeling: mottakerType === undefined');
        return undefined;
    }
    const samværsavtaleVedleggUrl: string[] = [];
    samværsavtale.forEach((s) => {
        if (s.url) {
            samværsavtaleVedleggUrl.push(s.url);
        }
    });
    const commonApiData = getCommonApiData(values);

    if (commonApiData === undefined) {
        logErrorToSentry(
            'getSøknadFordeling: harBruktOmsorgsdagerEtter1Juli && antallDagerBruktEtter1Juli === undefined (konvertering feil)'
        );
        return undefined;
    }
    return {
        ...commonApiData,
        type: Søknadstype.fordeling,
        fordeling: {
            mottakerType: mottakerType,
            samværsavtale: samværsavtaleVedleggUrl,
        },
    };
};

export const getSøknadOverføring = (values: MapFormDataToApiDataValues): SøknadOverføringApiData | undefined => {
    const { antallDagerSomSkalOverføres, mottakerType } = values.formData;
    if (antallDagerSomSkalOverføres === undefined || mottakerType === undefined) {
        logErrorToSentry(`getSøknadOverføring: ${JSON.stringify({ antallDagerSomSkalOverføres, mottakerType })}`);
        return undefined;
    }
    const antallDagerSomSkalOverføresNumber = getNumberFromNumberInputValue(antallDagerSomSkalOverføres);

    if (antallDagerSomSkalOverføresNumber === undefined) {
        logErrorToSentry(`getSøknadOverføring: ${JSON.stringify({ antallDagerSomSkalOverføresNumber, mottakerType })}`);
        return undefined;
    }
    const commonApiData = getCommonApiData(values);

    if (commonApiData === undefined) {
        logErrorToSentry(
            'getSøknadOverføring: harBruktOmsorgsdagerEtter1Juli && antallDagerBruktEtter1Juli === undefined (konvertering feil)'
        );
        return undefined;
    }
    return {
        ...commonApiData,
        type: Søknadstype.overføring,
        overføring: {
            antallDagerSomSkalOverføres: antallDagerSomSkalOverføresNumber,
            mottakerType: mottakerType,
        },
    };
};

export const mapFormDataToApiData = (values: MapFormDataToApiDataValues): SoknadApiData | undefined => {
    const søknadstype = getSøknadstype(values.formData);
    if (søknadstype === undefined) {
        logErrorToSentry('søknadstype is undefined');
    }
    let apiValues: SoknadApiData | undefined;
    try {
        switch (søknadstype) {
            case Søknadstype.koronaoverføring:
                apiValues = getSøknadKoronaoverføring(values);
                break;
            case Søknadstype.fordeling:
                apiValues = getSøknadFordeling(values);
                break;
            case Søknadstype.overføring:
                apiValues = getSøknadOverføring(values);
                break;
        }
    } catch (error) {
        logErrorToSentry(error);
    }
    if (apiValues === undefined && getEnvironmentVariable('APP_VERSION') === 'dev') {
        logErrorToSentry(JSON.stringify(values.formData));
    }
    return apiValues;
};
