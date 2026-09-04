import { Loader, VStack } from '@navikt/ds-react';

import { useUngInnsynIntl } from '../i18n';
import { UngInnsynPage } from './UngInnsynPage';

interface Props {
    applicationTitle: string;
}

export const UngLoadingPage = ({ applicationTitle: documentTitle }: Props) => {
    const { text } = useUngInnsynIntl();
    return (
        <UngInnsynPage documentTitle={`${text('@ungInnsyn.loading')} - ${documentTitle}`}>
            <VStack align="center" justify="center" marginBlock="space-40">
                <Loader size="3xlarge" />
            </VStack>
        </UngInnsynPage>
    );
};
