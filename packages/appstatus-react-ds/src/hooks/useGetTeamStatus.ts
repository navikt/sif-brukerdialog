import { useEffect, useRef, useState } from 'react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { SanityConfig, SanityError, Status, TeamStatus } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
import { getMessage, sanityConfigIsValid } from '../utils';
import { getAppSanityClient } from '../utils/sanityClient';

export const getTeamStatusQuery = (key: string): string => {
    return `*[_type == 'team' && key == "${key}"]{
        key,
        teamApplicationStatus,
        liveUpdate,
        message,
      }`;
};

export interface TeamStatusResult {
    key: string;
    name: string;
    liveUpdate?: boolean;
    teamApplicationStatus: {
        type: '_teamApplicationStatus';
        status: TeamStatus;
    };
    message?: SanityStatusMessage[];
}

export interface TeamState {
    status?: TeamStatus;
    message?: SanityStatusMessage;
    error?: SanityError;
    isLoading: boolean;
}
function useGetTeamStatus(teamKey: string | undefined, sanityConfig: SanityConfig): TeamState {
    const [status, setStatus] = useState<TeamStatus>(Status.normal);
    const [message, setMessage] = useState<SanityStatusMessage | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [liveUpdate, setLiveUpdate] = useState<boolean>();
    const [error, setError] = useState<SanityError | undefined>();

    const subscription = useRef<any>();

    async function fetch(key: string, config: SanityConfig) {
        const query = getTeamStatusQuery(key);
        setIsLoading(true);
        try {
            const result: TeamStatusResult[] = await getAppSanityClient(config).fetch(query);
            if (result.length === 1) {
                const team = result[0];
                setStatus(team.teamApplicationStatus.status);
                setMessage(getMessage(team.message));
                setLiveUpdate(team.liveUpdate === true);
            }
        } catch (error: any) {
            setError(error);
            setStatus(Status.normal);
            setMessage(undefined);
            setLiveUpdate(false);
        } finally {
            setIsLoading(false);
        }
    }
    const startSubscription = (key: string, config: SanityConfig) => {
        const query = getTeamStatusQuery(key);
        subscription.current = getAppSanityClient(config)
            .listen(query)
            .subscribe(({ result }) => {
                const team = result as any as TeamStatusResult;
                setStatus(team.teamApplicationStatus.status);
                setMessage(getMessage(team.message));
            });
    };

    const stopSubscription = () => {
        if (subscription.current && subscription.current.unsubscribe) {
            subscription.current.unsubscribe();
        }
    };

    const prevTeamKey = usePrevious(teamKey);
    const prevLiveUpdate = usePrevious(liveUpdate);

    useEffect(() => {
        if (!sanityConfigIsValid(sanityConfig)) {
            setIsLoading(false);
            return;
        }
        if (error) {
            setLiveUpdate(false);
            return;
        }
        if (teamKey) {
            fetch(teamKey, sanityConfig);
        }
        if (teamKey === undefined && subscription.current !== undefined) {
            setLiveUpdate(false);
        }
    }, [teamKey, prevTeamKey, error, sanityConfig]);

    useEffect(() => {
        if (teamKey) {
            if (liveUpdate === true) {
                if (!subscription.current) {
                    startSubscription(teamKey, sanityConfig);
                } else {
                    stopSubscription();
                    startSubscription(teamKey, sanityConfig);
                }
            } else {
                stopSubscription();
            }
        }
    }, [liveUpdate, prevLiveUpdate, teamKey, prevTeamKey, sanityConfig]);

    return { status, message, isLoading, error };
}

export default useGetTeamStatus;
