import type { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { getXRequestId } from '../../utils/apiUtils';
import { getAppSanityClient } from '@navikt/appstatus-react-ds/src/utils/sanityClient';
import { SanityConfig } from '@navikt/appstatus-react-ds';
import { browserEnv } from '../../utils/env';
import { APPLICATION_KEY } from '../_app.page';
import { ApplicationStatus, Status } from '@navikt/appstatus-react-ds/src/types';
import { SanityStatusMessage } from '@navikt/appstatus-react-ds/src/types/sanityObjects';
import { getStateForApplication } from '@navikt/appstatus-react-ds/src/hooks/useAppStatus';

const sanityConfig: SanityConfig = {
    projectId: browserEnv.NEXT_PUBLIC_APPSTATUS_PROJECT_ID,
    dataset: browserEnv.NEXT_PUBLIC_APPSTATUS_DATASET,
};

const getApplicationDocumentStatusQuery = (key: string, team?: string): string => {
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

const getTeamStatusQuery = (key: string): string => {
    return `*[_type == 'team' && key == "${key}"]{
        key,
        teamApplicationStatus,
        liveUpdate,
        message,
      }`;
};

export interface ApplicationState {
    status: ApplicationStatus;
    message?: SanityStatusMessage;
}

export const defaultAppStatus: ApplicationState = { status: Status.normal };

export const fetchAppStatus = async (): Promise<ApplicationState> => {
    const client = getAppSanityClient(sanityConfig);
    try {
        const [appResult, teamResult] = await Promise.allSettled([
            client.fetch(getApplicationDocumentStatusQuery(APPLICATION_KEY)),
            client.fetch(getTeamStatusQuery(APPLICATION_KEY)),
        ]);

        const app = appResult.status === 'fulfilled' && appResult.value.length === 1 ? appResult.value[0] : undefined;
        const team =
            teamResult.status === 'fulfilled' && teamResult.value.length === 1 ? teamResult.value[0] : undefined;

        if (!app) {
            return defaultAppStatus;
        }

        return getStateForApplication(
            app.applicationStatus.status,
            app.message ? app.message[0] : undefined,
            team?.teamApplicationStatus.status,
            team?.message ? team.message[0] : undefined,
        );
    } catch {
        return Promise.resolve(defaultAppStatus);
    }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.send(await fetchAppStatus());
    } catch (err) {
        const childLogger = createChildLogger(getXRequestId(req));
        childLogger.error(`Hent appStatus feilet: ${err}`);
        res.status(500).json({ error: 'Kunne ikke hente appStatus', err });
    }
}

export default withAuthenticatedApi(handler);
