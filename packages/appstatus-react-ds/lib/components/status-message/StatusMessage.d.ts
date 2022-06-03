/// <reference types="react" />
import { SanityLocale } from '../../types';
import { SanityStatusMessage } from '../../types/sanityObjects';
import './statusMessage.css';
interface Props {
    message: SanityStatusMessage;
    wrapInAlertStripe?: boolean;
    locale?: SanityLocale;
}
declare const StatusMessage: ({ message, locale, wrapInAlertStripe }: Props) => JSX.Element | null;
export default StatusMessage;
//# sourceMappingURL=StatusMessage.d.ts.map