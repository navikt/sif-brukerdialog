import { InitialDataErrorContent } from './content/InitialDataErrorContent';
import { ErrorPage } from './ErrorPage';

interface Props {
    applicationTitle: string;
}

export const InitialDataErrorPage = ({ applicationTitle }: Props) => {
    return (
        <ErrorPage applicationTitle={applicationTitle}>
            <InitialDataErrorContent />
        </ErrorPage>
    );
};
