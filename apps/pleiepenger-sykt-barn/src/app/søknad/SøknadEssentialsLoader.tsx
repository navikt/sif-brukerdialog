import React from 'react';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import * as apiUtils from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { AxiosError, AxiosResponse } from 'axios';
import { getBarn, getSøker, purge, rehydrate } from '../api/api';
import { SøkerdataContextProvider } from '../context/SøkerdataContext';
import IkkeTilgangPage from '../pages/ikke-tilgang-page/IkkeTilgangPage';
import LoadingPage from '../pages/loading-page/LoadingPage';
import { Søkerdata } from '../types/Søkerdata';
import { initialValues, SøknadFormField, SøknadFormValues } from '../types/SøknadFormValues';
import { MELLOMLAGRING_VERSION, MellomlagringMetadata, SøknadTempStorageData } from '../types/SøknadTempStorageData';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToLoginPage, userIsCurrentlyOnErrorPage } from '../utils/navigationUtils';

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

const getValidAttachments = (attachments: Attachment[] = []): Attachment[] => {
    return attachments.filter((a) => {
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
            const [mellomlagringResponse, søkerResponse, barnResponse] = await Promise.all([
                rehydrate(),
                getSøker(),
                getBarn(),
            ]);
            this.handleSøkerdataFetchSuccess(mellomlagringResponse, søkerResponse, barnResponse);
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

    async handleSøkerdataFetchSuccess(
        mellomlagringResponse: AxiosResponse,
        søkerResponse: AxiosResponse,
        barnResponse?: AxiosResponse
    ) {
        const registrerteBarn = barnResponse ? barnResponse.data.barn : undefined;
        const mellomlagring = await this.getValidMellomlagring(mellomlagringResponse?.data);
        const søkerdata: Søkerdata = {
            søker: søkerResponse.data,
            barn: registrerteBarn,
        };
        const formValuesToUse = mellomlagring
            ? {
                  ...mellomlagring.formValues,
                  [SøknadFormField.legeerklæring]: getValidAttachments(mellomlagring.formValues.legeerklæring),
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
        callback?: () => void
    ) {
        this.setState(
            {
                formValues: formValues || this.state.formValues,
                søkerdata: søkerdata || this.state.søkerdata,
                mellomlagringMetadata: mellomlagringMetadata || this.state.mellomlagringMetadata,
            },
            callback
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
        // this timeout is set because if isLoading is updated in the state too soon,
        // the contentLoadedRenderer() will be called while the user is still on the wrong route,
        // because the redirect to routeConfig.ERROR_PAGE_ROUTE will not have happened yet.
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
