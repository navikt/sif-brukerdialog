import { Link } from '@navikt/ds-react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { useEffect } from 'react';
import { AppText } from '../../i18n';

interface Props {
    onUnmount: () => void;
}

const KvitteringPage = ({ onUnmount }: Props) => {
    useLogSidevisning(SIFCommonPageKey.kvittering);
    useEffect(() => {
        return () => {
            onUnmount();
        };
    });
    return (
        <Page title="Endringsmelding er mottatt">
            <Kvittering tittel="Melding om endring er lagt til saken din">
                <p>
                    <AppText id="kvitteringPage.info.1" />
                </p>
                <Block margin="xl">
                    <AppText
                        id="kvitteringPage.info.2"
                        values={{
                            dinePleiepengerLink: (
                                <Link href={getEnvironmentVariable('INNSYN_URL')}>dine pleiepenger</Link>
                            ),
                        }}
                    />
                </Block>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
