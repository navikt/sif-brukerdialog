import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ApplicationType } from '../../types/ApplicationType';

interface Props {
    søknadstype: ApplicationType;
}

const IkkeTilgangPage = ({ søknadstype }: Props) => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);

    return (
        <Page
            className="ikkeTilgangPage"
            title={intlHelper(intl, `application.title.${søknadstype}`)}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, `application.title.${søknadstype}`)} />}>
            <Block margin="xxl">
                <SifGuidePanel poster={true}>
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                </SifGuidePanel>
            </Block>
        </Page>
    );
};

export default IkkeTilgangPage;
