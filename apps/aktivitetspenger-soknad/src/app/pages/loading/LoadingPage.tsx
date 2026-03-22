import { Loader, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useAppIntl } from '../../i18n';

export const LoadingPage = () => {
    const { text } = useAppIntl();
    return (
        <ApplicationPage documentTitle="Laster inn ..." applicationTitle={text('application.title')}>
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Loader size="3xlarge" title="Laster inn..." />
            </VStack>
        </ApplicationPage>
    );
};
