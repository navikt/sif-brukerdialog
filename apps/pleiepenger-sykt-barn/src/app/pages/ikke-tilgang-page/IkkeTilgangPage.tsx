import { Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import getLenker from '../../lenker';

const IkkeTilgangPage = () => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <Page
            className="ikkeTilgangPage"
            title={intlHelper(intl, 'application.title')}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'application.title')} />}>
            <Block margin="xxl">
                <SifGuidePanel poster={true}>
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                    <Link href={getLenker(intl.locale).papirskjemaPrivat} target="_blank">
                        <FormattedMessage id="page.ikkeTilgang.lastNed" />
                    </Link>
                </SifGuidePanel>
            </Block>
        </Page>
    );
};

export default IkkeTilgangPage;
