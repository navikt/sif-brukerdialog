import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import { ApplicationType } from '../../../types/ApplicationType';

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
                <CounsellorPanel type="plakat">
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                </CounsellorPanel>
            </Block>
        </Page>
    );
};

export default IkkeTilgangPage;
