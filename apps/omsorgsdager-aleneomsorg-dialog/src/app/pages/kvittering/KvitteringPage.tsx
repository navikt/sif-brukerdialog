import { Link } from '@navikt/ds-react';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import Kvittering from '@navikt/sif-common-soknad-ds/lib/components/kvittering/Kvittering';
import getLenker from '../../lenker';

interface Props {
    onUnmount: () => void;
}

const KvitteringPage = ({ onUnmount }: Props) => {
    const intl = useIntl();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    });

    useLogSidevisning(SIFCommonPageKey.kvittering);

    return (
        <Page title={intlHelper(intl, 'application.title')}>
            <>
                <Kvittering
                    tittel={intlHelper(intl, 'kvittering.tittel')}
                    liste={{
                        tittel: intlHelper(intl, 'kvittering.info.tittel'),
                        punkter: [
                            intlHelper(intl, 'kvittering.info.1'),
                            intlHelper(intl, 'kvittering.info.2'),
                            <span key="pkt3">
                                <FormattedMessage id="kvittering.info.3.1" />{' '}
                                <Link href={getLenker().saksbehandlingstider} target="_blank">
                                    <FormattedMessage id="kvittering.info.3.2.lenke" />
                                </Link>
                            </span>,
                        ],
                    }}></Kvittering>
            </>
        </Page>
    );
};

export default KvitteringPage;
