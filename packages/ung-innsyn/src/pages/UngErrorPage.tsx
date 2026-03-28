import { VStack } from '@navikt/ds-react';

import { InnsynDefaultErrorMessage } from '../components/innsyn-default-error-message/InnsynDefaultErrorMessage';
import { useUngUiIntl } from '../i18n';
import { UngInnsynPage } from './UngInnsynPage';

interface Props {
    applicationTitle: string;
}

export const UngErrorPage = ({ applicationTitle }: Props) => {
    const { text } = useUngUiIntl();
    return (
        <UngInnsynPage documentTitle={`${text('@ungInnsyn.errorPage')} - ${applicationTitle}`}>
            <VStack gap="space-24">
                <InnsynDefaultErrorMessage />
            </VStack>
        </UngInnsynPage>
    );
};
