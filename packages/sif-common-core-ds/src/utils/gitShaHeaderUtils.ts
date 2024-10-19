import { getCommitShaFromEnv } from '@navikt/sif-common-env';
import { RawAxiosRequestHeaders } from 'axios';

const GitShaHeaderKey = 'X-Brukerdialog-Git-Sha';

export const getGitShaRequestHeader = (): RawAxiosRequestHeaders | undefined => {
    const sha = getCommitShaFromEnv();
    return sha ? { [GitShaHeaderKey]: sha } : undefined;
};
