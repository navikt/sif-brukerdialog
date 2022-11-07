import React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import Kvittering from '@navikt/sif-common-core-ds/lib/components/kvittering/Kvittering';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { Link } from '@navikt/ds-react';
import getLenker from '../../lenker';

const KvitteringPage: React.FunctionComponent = () => {
    const intl = useIntl();
    useLogSidevisning('søknad-sendt');
    return (
        <Page title={intlHelper(intl, 'application.title')}>
            <Kvittering
                tittel={intlHelper(intl, 'kvittering.tittel')}
                liste={{
                    tittel: intlHelper(intl, 'kvittering.info.tittel'),
                    punkter: [
                        intlHelper(intl, 'kvittering.info.1'),
                        intlHelper(intl, 'kvittering.info.2'),
                        <span key="pkt3">
                            {intlHelper(intl, 'kvittering.info.3a')}{' '}
                            <Link href={getLenker().minSide}>{intlHelper(intl, 'kvittering.info.3b')}</Link>
                            {intlHelper(intl, 'kvittering.info.3c')}
                        </span>,
                    ],
                }}></Kvittering>
        </Page>
    );
};

export default KvitteringPage;
