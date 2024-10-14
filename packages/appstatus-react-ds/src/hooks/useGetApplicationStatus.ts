import { useEffect, useRef, useState } from 'react';
import { ApplicationStatus, SanityConfig, SanityError, Status } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
import { getMessage, sanityConfigIsValid } from '../utils';
import { getAppSanityClient } from '../utils/sanityClient';
import { usePrevious } from '@navikt/sif-common/src/hooks';

export const getApplicationDocumentStatusQuery = (key: string, team?: string): string => {
    const teamQuery = team ? `team->.key == "${team}"` : '';
    return `*[_type == 'application' && key == "${key}"${teamQuery}]{
        key,
        applicationStatus,
        message,
        liveUpdate,
        name,
        team->{key}
      }`;
};

export interface ApplicationSanityQueryResult {
    key: string;
    name: string;
    applicationStatus: {
        type: '_applicationStatus';
        status: ApplicationStatus;
    };
    liveUpdate?: boolean;
    message: SanityStatusMessage[];
    team?: {
        key: string;
    };
}

export interface ApplicationState {
    status: ApplicationStatus;
    message?: SanityStatusMessage;
}

const defaultState: ApplicationState = {
    status: Status.normal,
    message: undefined,
};

export interface AppStatus {
    team?: string;
    isLoading: boolean;
    message?: SanityStatusMessage;
    status: ApplicationStatus;
    error?: SanityError;
}

function useGetApplicationStatus(applicationKey: string, sanityConfig: SanityConfig): AppStatus {
    const [state, setState] = useState<ApplicationState>(defaultState);
    const [application, setApplication] = useState<ApplicationSanityQueryResult | undefined>();
    const [applicationTeam, setApplicationTeam] = useState<string>();
    const [liveUpdate, setLiveUpdate] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<SanityError>();

    const subscription = useRef<any>();

    async function fetch(key: string, config: SanityConfig) {
        setIsLoading(true);
        try {
            const result: ApplicationSanityQueryResult[] = await getAppSanityClient(config).fetch(
                getApplicationDocumentStatusQuery(key),
            );
            if (result.length === 1) {
                const appResult = result[0];
                setApplication(appResult);
                setApplicationTeam(appResult.team?.key);
                setLiveUpdate(appResult.liveUpdate === true);
            }
        } catch (err: any) {
            setError(err);
            setApplication(undefined);
            setApplicationTeam(undefined);
            setLiveUpdate(false);
        } finally {
            setIsLoading(false);
        }
    }

    const startSubscription = (key: string, config: SanityConfig) => {
        subscription.current = getAppSanityClient(config)
            .listen(getApplicationDocumentStatusQuery(key))
            .subscribe(({ result }) => {
                const appResult = result as any as ApplicationSanityQueryResult;
                setApplication(appResult);
            });
    };

    const prevApplicationKey = usePrevious(applicationKey);
    const prevLiveUpdate = usePrevious(liveUpdate);

    const stopSubscription = () => {
        if (subscription.current && subscription.current.unsubscribe) {
            subscription.current.unsubscribe();
        }
    };

    useEffect(() => {
        if (!sanityConfigIsValid(sanityConfig)) {
            setIsLoading(false);
            return;
        }
        if (error) {
            setLiveUpdate(false);
            return;
        }
        if (applicationKey && applicationKey !== prevApplicationKey) {
            fetch(applicationKey, sanityConfig);
        }
        if (applicationKey === undefined) {
            setLiveUpdate(false);
        }
    }, [applicationKey, prevApplicationKey, error, sanityConfig]);

    useEffect(() => {
        if (
            applicationKey &&
            (prevLiveUpdate !== liveUpdate || (applicationKey && applicationKey !== prevApplicationKey))
        ) {
            if (liveUpdate === true) {
                if (!subscription.current) {
                    startSubscription(applicationKey, sanityConfig);
                } else {
                    stopSubscription();
                    startSubscription(applicationKey, sanityConfig);
                }
            } else {
                stopSubscription();
            }
        }
    }, [liveUpdate, prevLiveUpdate, applicationKey, prevApplicationKey, sanityConfig]);

    useEffect(() => {
        if (application) {
            setState({
                status: application.applicationStatus.status,
                message: getMessage(application.message),
            });
        }
    }, [application]);

    return { ...state, team: applicationTeam, isLoading, error };
}

export default useGetApplicationStatus;
