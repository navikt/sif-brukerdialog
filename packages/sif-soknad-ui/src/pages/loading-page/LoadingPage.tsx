import { Loader, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

interface Props {
    applicationTitle: string;
}

export const LoadingPage = ({ applicationTitle }: Props) => {
    return (
        <ApplicationPage documentTitle="Laster inn ..." applicationTitle={applicationTitle}>
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Loader size="3xlarge" title="Laster inn..." />
            </VStack>
        </ApplicationPage>
    );
};
