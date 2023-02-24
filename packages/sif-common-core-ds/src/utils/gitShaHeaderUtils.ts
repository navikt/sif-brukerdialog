import { RawAxiosRequestHeaders } from 'axios';
import { getCommitShaFromEnv } from './envUtils';

const GitShaHeaderKey = 'X-Brukerdialog-Git-Sha';

export const getGitShaRequestHeader = (): RawAxiosRequestHeaders | undefined => {
    const sha = getCommitShaFromEnv();
    return sha ? { [GitShaHeaderKey]: sha } : undefined;
};
