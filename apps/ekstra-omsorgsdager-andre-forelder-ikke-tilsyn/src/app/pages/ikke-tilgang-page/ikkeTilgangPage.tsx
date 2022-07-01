import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import getLenker from '../../lenker';
import Lenke from 'nav-frontend-lenker';

const IkkeTilgangPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <Page
            className="ikkeTilgangPage"
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, 'application.title')} />}>
            <Box margin="xxl">
                <CounsellorPanel type="plakat">
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                    <Lenke href={getLenker(intl.locale).soknadRegnetSomAleneBrev} target="_blank">
                        <FormattedMessage id="page.ikkeTilgang.lastNed" />
                    </Lenke>
                </CounsellorPanel>
            </Box>
        </Page>
    );
};

export default IkkeTilgangPage;
