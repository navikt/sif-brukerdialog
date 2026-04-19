import { Loader, VStack } from '@navikt/ds-react';

import { useSifSoknadUiIntl } from '../../i18n';

interface Props {
    title?: string;
}

export const FormContentLoader = ({ title }: Props) => {
    const { text } = useSifSoknadUiIntl();
    return (
        <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '20vh' }}>
            <Loader size="3xlarge" title={title || text('@sifSoknadUi.loadingPage.loaderTitle')} />
        </VStack>
    );
};
