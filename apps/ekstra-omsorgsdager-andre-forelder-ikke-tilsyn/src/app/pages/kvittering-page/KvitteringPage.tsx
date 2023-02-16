import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Kvittering from '@navikt/sif-common-core/lib/components/kvittering/Kvittering';
import getLenker from '../../lenker';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';

const KvitteringPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.kvittering);
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
                            <FormattedMessage id="kvittering.info.3a" />{' '}
                            <Lenke href={getLenker().saksbehandlingstider} target="_blank">
                                <FormattedMessage id="kvittering.info.3b" />
                            </Lenke>
                        </span>,
                    ],
                }}></Kvittering>
        </Page>
    );
};

export default KvitteringPage;
