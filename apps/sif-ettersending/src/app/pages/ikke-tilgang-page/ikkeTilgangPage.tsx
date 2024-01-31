import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { Søknadstype } from '../../types/Søknadstype';

interface Props {
    søknadstype: Søknadstype;
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
