import { Alert, Heading, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/src/atoms/formatted-html-message/FormattedHtmlMessage';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import getLenker from '../../lenker';
import { KvitteringInfo } from '../../types/KvitteringInfo';
import './confirmationPage.less';

interface Props {
    kvitteringInfo?: KvitteringInfo;
}

const bem = bemUtils('confirmationPage');

const KvitteringPage = ({ kvitteringInfo }: Props) => {
    const intl = useIntl();

    const lenker = getLenker(intl.locale);

    useLogSidevisning(SIFCommonPageKey.kvittering);

    return (
        <Page
            title={intlHelper(intl, 'page.kvittering.sidetittel')}
            className={bem.block}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'application.title')} />}>
            <div className={bem.element('centeredContent')}>
                <CheckmarkIcon />
                <Block margin="xl">
                    <Heading level="1" size="large">
                        <FormattedMessage id="page.kvittering.tittel.1" />
                    </Heading>
                    <Block margin="m">
                        <Heading level="2" size="small" style={{ maxWidth: '20rem', margin: 'auto' }}>
                            <FormattedMessage id="page.kvittering.tittel.2" />
                        </Heading>
                    </Block>
                </Block>
            </div>
            {kvitteringInfo?.arbeidsgivere && (
                <Block margin="xl">
                    <Alert variant="warning">
                        {intlHelper(intl, 'page.kvittering.tittel.advarsel.list.tittel')}
                        <ul style={{ marginTop: '0rem', marginBottom: '0rem' }}>
                            <li>
                                <FormattedMessage id="page.kvittering.tittel.advarsel.list.item.1" />
                            </li>
                            <li>
                                <FormattedMessage id="page.kvittering.tittel.advarsel.list.item.2" />
                            </li>
                        </ul>
                    </Alert>
                </Block>
            )}

            <Block margin="xxl">
                <Heading level="2" size="medium">
                    <FormattedHtmlMessage id="page.kvittering.dinePP.info.tittel" />
                </Heading>
                <Block margin="m">
                    <ul>
                        {kvitteringInfo?.arbeidsgivere && (
                            <li>
                                <FormattedMessage id="page.kvittering.dinePP.list.item.1" />
                            </li>
                        )}
                        <li>
                            <FormattedMessage id="page.kvittering.dinePP.list.item.2" />
                        </li>
                        <li>
                            <FormattedMessage id="page.kvittering.dinePP.list.item.3" />
                        </li>
                        <li>
                            <FormattedMessage id="page.kvittering.dinePP.list.item.4" />
                        </li>
                    </ul>
                    <Block margin="xl">
                        <Link href={lenker.innsynSIF} target="_blank" className="knapp knapp--hoved">
                            <FormattedMessage id="page.kvittering.dinePP.lenke" />
                        </Link>
                    </Block>
                </Block>
            </Block>
        </Page>
    );
};

export default KvitteringPage;
