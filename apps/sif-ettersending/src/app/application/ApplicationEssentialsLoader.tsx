import React, { useEffect, useState } from 'react';
import { getSøker } from '../api/api';
import LoadWrapper from '../components/load-wrapper/LoadWrapper';
import { SøkerdataContextProvider } from '../context/ApplicantDataContext';
import { ApplicantData, Person } from '../types/ApplicantData';
import { ApplicationType } from '../types/ApplicationType';
import {
    navigateToErrorPage,
    navigateToLoginPage,
    navigateToWelcomePage,
    userIsCurrentlyOnErrorPage,
} from '../utils/navigationUtils';
import appSentryLogger from '../utils/appSentryLogger';
import { useHistory } from 'react-router';
import { AxiosResponse } from 'axios';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core/lib/utils/apiUtils';
import IkkeTilgangPage from '../components/pages/ikke-tilgang-page/ikkeTilgangPage';

interface Props {
    contentLoadedRenderer: (søkerdata?: ApplicantData) => React.ReactNode;
    søknadstype: ApplicationType;
}

interface LoadState {
    isLoading: boolean;
    doApiCalls: boolean;
    hasNoAccess?: boolean;
    error?: boolean;
}

interface Essentials {
    søkerdata: ApplicantData;
}

const ApplicationEssentialsLoader = ({ contentLoadedRenderer, søknadstype }: Props) => {
    const history = useHistory();
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: true, doApiCalls: true });
    const [essentials, setEssentials] = useState<Essentials | undefined>();

    useEffect(() => {
        const handleEssentialsFetchSuccess = (søkerResponse: AxiosResponse<Person>) => {
            setEssentials({
                søkerdata: {
                    person: søkerResponse.data,
                },
            });

            setLoadState({ isLoading: false, doApiCalls: false, error: undefined });

            if (userIsCurrentlyOnErrorPage(søknadstype)) {
                navigateToWelcomePage(søknadstype);
            }
        };
        async function loadEssentials() {
            if (essentials?.søkerdata === undefined && loadState.error === undefined) {
                try {
                    const [søkerResponse] = await Promise.all([getSøker()]);
                    handleEssentialsFetchSuccess(søkerResponse);
                } catch (error) {
                    if (isUnauthorized(error)) {
                        navigateToLoginPage(søknadstype);
                        setLoadState({ isLoading: true, doApiCalls: false, error: undefined });
                    } else if (isForbidden(error)) {
                        setLoadState({ isLoading: false, doApiCalls: false, error: false, hasNoAccess: true });
                    } else if (!userIsCurrentlyOnErrorPage(søknadstype)) {
                        appSentryLogger.logApiError(error);
                        navigateToErrorPage(history);
                        setLoadState({ isLoading: false, doApiCalls: false, error: true });
                    } else {
                        setLoadState({ isLoading: false, doApiCalls: false, error: true });
                    }
                }
            }
        }
        if (loadState.doApiCalls) {
            loadEssentials();
        }
    }, [essentials, loadState, history]);

    const { isLoading, error, hasNoAccess } = loadState;

    if (hasNoAccess) {
        return <IkkeTilgangPage søknadstype={søknadstype} />;
    }

    return (
        <LoadWrapper
            isLoading={isLoading && error === undefined}
            contentRenderer={() => (
                <SøkerdataContextProvider value={essentials?.søkerdata}>
                    {contentLoadedRenderer(essentials?.søkerdata)}
                </SøkerdataContextProvider>
            )}
        />
    );
};

export default ApplicationEssentialsLoader;
