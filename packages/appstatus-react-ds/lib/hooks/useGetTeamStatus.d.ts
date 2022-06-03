import { SanityConfig, SanityError, TeamStatus } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
export interface TeamState {
    status?: TeamStatus;
    message?: SanityStatusMessage;
    error?: SanityError;
    isLoading: boolean;
}
declare function useGetTeamStatus(teamKey: string | undefined, sanityConfig: SanityConfig): TeamState;
export default useGetTeamStatus;
//# sourceMappingURL=useGetTeamStatus.d.ts.map