import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import CounsellorPanel from '@navikt/sif-common-core-ds/lib/components/counsellor-panel/CounsellorPanel';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core-ds/lib/components/step-banner/StepBanner';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';

const IkkeTilgangPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <Page
            className="ikkeTilgangPage"
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, 'application.title')} />}>
            <Block margin="xxl">
                <CounsellorPanel type="plakat">
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                    <Lenke href={getLenker(intl.locale).meldingOmDelingAvOmsorgsdager} target="_blank">
                        <FormattedMessage id="page.ikkeTilgang.lastNed" />
                    </Lenke>
                </CounsellorPanel>
            </Block>
        </Page>
    );
};

export default IkkeTilgangPage;
