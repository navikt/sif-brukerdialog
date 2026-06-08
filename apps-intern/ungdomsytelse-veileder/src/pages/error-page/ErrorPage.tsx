import { HStack } from '@navikt/ds-react';
import { ApiError } from '@navikt/ung-common';
import AppPage from '../../components/app-page/AppPage';
import ErrorPageContent from './ErrorPageContent';

interface Props {
    error: ApiError | string;
    visTips?: boolean;
}

const ErrorPage = (props: Props) => (
    <AppPage>
        <HStack paddingBlock="space-128 space-0" paddingInline="space-24" justify="center">
            <ErrorPageContent {...props} />
        </HStack>
    </AppPage>
);

export default ErrorPage;
