import { TokenPayload } from '../auth/withAuthentication';

export interface RequestContext {
    payload: TokenPayload;
    accessToken: string;
    requestId: string;
    sessionId: string;
}
