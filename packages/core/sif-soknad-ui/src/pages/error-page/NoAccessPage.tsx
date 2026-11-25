import { NoAccessContent } from './content/NoAccessContent';
import { ErrorPage } from './ErrorPage';

interface Props {
    applicationTitle: string;
}

export const NoAccessPage = ({ applicationTitle }: Props) => {
    return (
        <ErrorPage applicationTitle={applicationTitle}>
            <NoAccessContent />
        </ErrorPage>
    );
};
