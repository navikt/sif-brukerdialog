import { useEffect, useState } from 'react';
import { Status, ApplicationStatus, ApplicationInheritTeamStatus, SanityError, SanityConfig } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
import useGetApplicationStatus from './useGetApplicationStatus';
import useGetTeamStatus from './useGetTeamStatus';
import { sanityConfigIsValid } from '../utils';

interface State {
    status: Status;
    message?: SanityStatusMessage;
    error?: SanityError;
}

export const defaultAppStatus: State = {
    status: Status.normal,
    message: undefined,
};

export const getStateForApplication = (
    appStatus: ApplicationStatus,
    appMessage: SanityStatusMessage | undefined,
    teamStatus: Status | undefined,
    teamMessage: SanityStatusMessage | undefined,
) => {
    if (appStatus !== ApplicationInheritTeamStatus.team) {
        return {
            status: appStatus,
            message: appMessage || teamMessage,
        };
    }
    if (appStatus === ApplicationInheritTeamStatus.team && teamStatus !== undefined) {
        return {
            status: teamStatus,
            message: appMessage || teamMessage,
        };
    }
    return defaultAppStatus;
};

function useAppStatus(applicationKey: string, sanityConfig: SanityConfig): State & { isLoading: boolean } {
    const [state, setState] = useState<State>(defaultAppStatus);
    const [config] = useState<SanityConfig>(sanityConfig);

    const {
        status: appStatus,
        message: appMessage,
        team: appTeam,
        isLoading: appIsLoading,
        error: appError,
    } = useGetApplicationStatus(applicationKey, config);

    const {
        status: teamStatus,
        message: teamMessage,
        isLoading: teamIsLoading,
        error: teamError,
    } = useGetTeamStatus(appTeam, config);

    const [isLoading, setIsLoading] = useState<boolean>(appIsLoading || teamIsLoading);
    const [error, setError] = useState<SanityError | undefined>(appError || teamError);

    useEffect(() => {
        if (!sanityConfigIsValid(config)) {
            setIsLoading(false);
            return;
        }
        setIsLoading(appIsLoading || teamIsLoading);
        setState(getStateForApplication(appStatus, appMessage, teamStatus, teamMessage));
    }, [appStatus, appMessage, appTeam, teamMessage, teamStatus, appIsLoading, teamIsLoading, config]);

    useEffect(() => {
        setError(appError || teamError);
    }, [appError, teamError]);

    return { ...state, isLoading, error };
}

export default useAppStatus;
