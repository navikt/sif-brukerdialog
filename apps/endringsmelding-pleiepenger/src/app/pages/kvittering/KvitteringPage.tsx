import { BodyShort, Link } from '@navikt/ds-react';
import { useEffect } from 'react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import { appEnv } from '../../utils/appEnv';

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
                <BodyShort>
                    <AppText
                        id="kvitteringPage.info.1"
                        values={{
                            Lenke: (children) => <Link href={appEnv.SIF_PUBLIC_INNSYN_URL}>{children}</Link>,
                        }}
                    />
                </BodyShort>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
