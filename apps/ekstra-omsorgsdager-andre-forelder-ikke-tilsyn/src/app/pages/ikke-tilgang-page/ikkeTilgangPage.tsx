import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { Link } from '@navikt/ds-react';
import getLenker from '../../lenker';

const IkkeTilgangPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <Page
            className="ikkeTilgangPage"
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'application.title')} />}>
            <Box margin="xxl">
                <SifGuidePanel poster={true}>
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                    <Link href={getLenker(intl.locale).soknadRegnetSomAleneBrev} target="_blank">
                        <FormattedMessage id="page.ikkeTilgang.lastNed" />
                    </Link>
                </SifGuidePanel>
            </Box>
        </Page>
    );
};

export default IkkeTilgangPage;
