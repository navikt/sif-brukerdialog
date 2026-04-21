import { AppText, useAppIntl } from '@app/i18n';
import { BodyShort, Link, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { useEffect } from 'react';

import Skyra, { Slug } from '../../skyra/Skyra';
import { Feature, isFeatureEnabled } from '../../utils';
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
    }, []);
    return (
        <Page title={text('kvitteringPage.pageTitle')}>
            <VStack gap="space-24">
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
                {isFeatureEnabled(Feature.SIF_PUBLIC_ENDRE_OMSORGSTILBUD) && <Skyra slug={Slug.kvittering_inline} />}
            </VStack>
        </Page>
    );
};

export default KvitteringPage;
