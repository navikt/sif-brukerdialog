import { Status, SanityError, SanityConfig } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
interface State {
    status: Status;
    message?: SanityStatusMessage;
    error?: SanityError;
}
declare function useAppStatus(applicationKey: string, sanityConfig: SanityConfig): State & {
    isLoading: boolean;
};
export default useAppStatus;
//# sourceMappingURL=useAppStatus.d.ts.map