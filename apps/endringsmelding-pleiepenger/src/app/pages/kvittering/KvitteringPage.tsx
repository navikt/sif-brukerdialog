import { Link } from '@navikt/ds-react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { useEffect } from 'react';
import { AppText, useAppIntl } from '../../i18n';

interface Props {
    onUnmount: () => void;
}

const KvitteringPage = ({ onUnmount }: Props) => {
    const { text } = useAppIntl();
    useLogSidevisning(SIFCommonPageKey.kvittering);
    useEffect(() => {
        return () => {
            onUnmount();
        };
    });
    return (
        <Page title={text('kvitteringPage.pageTitle')}>
            <Kvittering tittel={text('kvitteringPage.title')}>
                <p>
                    <AppText id="kvitteringPage.info.1" />
                </p>
                <Block margin="xl">
                    <AppText
                        id="kvitteringPage.info.2"
                        values={{
                            Lenke: (children) => <Link href={getEnvironmentVariable('INNSYN_URL')}>{children}</Link>,
                        }}
                    />
                </Block>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
