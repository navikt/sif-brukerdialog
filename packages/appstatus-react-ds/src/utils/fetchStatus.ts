import { SanityConfig } from '..';
import { getStateForApplication } from '../hooks/useAppStatus';
import { ApplicationState, getApplicationDocumentStatusQuery } from '../hooks/useGetApplicationStatus';
import { getTeamStatusQuery } from '../hooks/useGetTeamStatus';
import { getAppSanityClient } from './sanityClient';

export const fetchStatus = async (
    applicationKey: string,
    sanityConfig: SanityConfig,
): Promise<ApplicationState | undefined> => {
    const client = getAppSanityClient(sanityConfig);
    try {
        const [appResult, teamResult] = await Promise.allSettled([
            client.fetch(getApplicationDocumentStatusQuery(applicationKey)),
            client.fetch(getTeamStatusQuery(applicationKey)),
        ]);

        const app = appResult.status === 'fulfilled' && appResult.value.length === 1 ? appResult.value[0] : undefined;
        const team =
            teamResult.status === 'fulfilled' && teamResult.value.length === 1 ? teamResult.value[0] : undefined;

        if (!app) {
            return undefined;
        }

        return getStateForApplication(
            app.applicationStatus.status,
            app.message ? app.message[0] : undefined,
            team?.teamApplicationStatus.status,
            team?.message ? team.message[0] : undefined,
        );
    } catch (err) {
        throw new Error(`Could not load appStatus [${err}]`);
    }
};
