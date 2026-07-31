import { ErrorPage } from './ErrorPage';
import { InitialDataErrorContent } from './content/InitialDataErrorContent';

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
