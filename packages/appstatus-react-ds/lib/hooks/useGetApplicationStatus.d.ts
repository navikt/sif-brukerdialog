import { ApplicationStatus, SanityConfig, SanityError } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
export interface AppStatus {
    team?: string;
    isLoading: boolean;
    message?: SanityStatusMessage;
    status: ApplicationStatus;
    error?: SanityError;
}
declare function useGetApplicationStatus(applicationKey: string, sanityConfig: SanityConfig): AppStatus;
export default useGetApplicationStatus;
//# sourceMappingURL=useGetApplicationStatus.d.ts.map