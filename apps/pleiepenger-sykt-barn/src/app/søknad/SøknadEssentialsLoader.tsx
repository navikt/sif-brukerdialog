import React from 'react';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import * as apiUtils from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { LoadingPage } from '@navikt/sif-common-soknad-ds';
import { AxiosError, AxiosResponse } from 'axios';
import { purge, rehydrate } from '../api/api';
import { SøkerdataContextProvider } from '../context/SøkerdataContext';
import IkkeTilgangPage from '../pages/ikke-tilgang-page/IkkeTilgangPage';
import { Søkerdata } from '../types/Søkerdata';
import { initialValues, SøknadFormField, SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { MELLOMLAGRING_VERSION, MellomlagringMetadata, SøknadTempStorageData } from '../types/SøknadTempStorageData';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToLoginPage, userIsCurrentlyOnErrorPage } from '../utils/navigationUtils';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';

interface Props {
    onUgyldigMellomlagring: () => void;
    onError: () => void;
    contentLoadedRenderer: (content: {
        formValues: SøknadFormValues;
        søkerdata?: Søkerdata;
        mellomlagringMetadata?: MellomlagringMetadata;
    }) => React.ReactNode;
}

interface State {
    isLoading: boolean;
    willRedirectToLoginPage: boolean;
    formValues: SøknadFormValues;
    søkerdata?: Søkerdata;
    mellomlagringMetadata?: MellomlagringMetadata;
    harIkkeTilgang: boolean;
}

const getValidVedlegg = (vedlegg: Vedlegg[] = []): Vedlegg[] => {
    return vedlegg.filter((a) => {
        return a.file?.name !== undefined;
    });
};

const isMellomlagringValid = (mellomlagring: SøknadTempStorageData): boolean => {
    return (
        mellomlagring.metadata?.version === MELLOMLAGRING_VERSION &&
        mellomlagring.formValues?.harForståttRettigheterOgPlikter === true
    );
};
class SøknadEssentialsLoader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: true,
            willRedirectToLoginPage: false,
            formValues: initialValues,
            harIkkeTilgang: false,
        };

        this.updateSøkerdata = this.updateSøkerdata.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.handleSøkerdataFetchSuccess = this.handleSøkerdataFetchSuccess.bind(this);
        this.handleSøkerdataFetchError = this.handleSøkerdataFetchError.bind(this);
        this.loadAppEssentials();
    }

    async loadAppEssentials() {
        try {
            const [mellomlagringResponse, søker, barn] = await Promise.all([rehydrate(), fetchSøker(), fetchBarn()]);
            this.handleSøkerdataFetchSuccess(mellomlagringResponse, søker, barn);
        } catch (error: any) {
            this.handleSøkerdataFetchError(error);
        }
    }

    getValidMellomlagring = async (data?: SøknadTempStorageData): Promise<SøknadTempStorageData | undefined> => {
        if (data) {
            if (isMellomlagringValid(data)) {
                return data;
            } else if (Object.keys(data).length > 0) {
                /** Mellomlagring inneholder data, men er ikke gyldig - slettes */
                this.props.onUgyldigMellomlagring();
                await purge();
            }
        }
        return undefined;
    };

    async handleSøkerdataFetchSuccess(mellomlagringResponse: AxiosResponse, søker: Søker, barn: RegistrertBarn[]) {
        const mellomlagring = await this.getValidMellomlagring(mellomlagringResponse?.data);
        const søkerdata: Søkerdata = {
            søker,
            barn,
        };
        const formValuesToUse = mellomlagring
            ? {
                  ...mellomlagring.formValues,
                  [SøknadFormField.legeerklæring]: getValidVedlegg(mellomlagring.formValues.legeerklæring),
              }
            : { ...initialValues };

        this.updateSøkerdata(formValuesToUse, søkerdata, mellomlagring?.metadata, () => {
            this.stopLoading();
            if (userIsCurrentlyOnErrorPage()) {
                this.props.onError();
            }
        });
    }

    updateSøkerdata(
        formValues: SøknadFormValues,
        søkerdata: Søkerdata,
        mellomlagringMetadata?: MellomlagringMetadata,
        callback?: () => void,
    ) {
        this.setState(
            {
                formValues: formValues || this.state.formValues,
                søkerdata: søkerdata || this.state.søkerdata,
                mellomlagringMetadata: mellomlagringMetadata || this.state.mellomlagringMetadata,
            },
            callback,
        );
    }

    stopLoading() {
        this.setState({
            isLoading: false,
        });
    }

    handleSøkerdataFetchError(error: AxiosError) {
        if (apiUtils.isUnauthorized(error)) {
            this.setState({ ...this.state, willRedirectToLoginPage: true });
            relocateToLoginPage();
        } else if (apiUtils.isForbidden(error)) {
            this.setState({ ...this.state, harIkkeTilgang: true });
        } else if (!userIsCurrentlyOnErrorPage()) {
            appSentryLogger.logApiError(error);
            this.props.onError();
        }
        /**
         * this timeout is set because if isLoading is updated in the state too soon,
         * the contentLoadedRenderer() will be called while the user is still on the wrong route,
         * because the redirect to routeConfig.ERROR_PAGE_ROUTE will not have happened yet.
         */

        setTimeout(this.stopLoading, 200);
    }

    render() {
        const { contentLoadedRenderer } = this.props;
        const { isLoading, harIkkeTilgang, willRedirectToLoginPage, formValues, søkerdata, mellomlagringMetadata } =
            this.state;

        if (isLoading || willRedirectToLoginPage) {
            return <LoadingPage />;
        }
        if (harIkkeTilgang) {
            return <IkkeTilgangPage />;
        }
        return (
            <SøkerdataContextProvider value={søkerdata}>
                {contentLoadedRenderer({
                    formValues,
                    søkerdata,
                    mellomlagringMetadata,
                })}
            </SøkerdataContextProvider>
        );
    }
}

export default SøknadEssentialsLoader;
