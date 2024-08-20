import { Link } from '@navikt/ds-react';
import { useEffect } from 'react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';

interface Props {
    onUnmount: () => void;
}

const KvitteringPage = ({ onUnmount }: Props) => {
    const { text } = useAppIntl();
    useEffect(() => {
        return () => {
            onUnmount();
        };
    });
    return (
        <Page title={text('kvitteringPage.pageTitle')}>
            <Kvittering tittel={text('kvitteringPage.title')}>
                <AppText
                    id="kvitteringPage.info.1"
                    values={{
                        Lenke: (children) => <Link href={getEnvironmentVariable('INNSYN_URL')}>{children}</Link>,
                    }}
                />
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
