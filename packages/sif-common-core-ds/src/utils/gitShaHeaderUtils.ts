import { getCommitShaFromEnv } from './envUtils';

const GitShaHeaderKey = 'X-Brukerdialog-Git-Sha';

type GitCommitShaHeader = {
    [GitShaHeaderKey]: string;
};
export const getGitShaRequestHeader = (): GitCommitShaHeader | undefined => {
    const sha = getCommitShaFromEnv();
    return sha ? { [GitShaHeaderKey]: sha } : undefined;
};
