import { Alert, BodyLong, Heading, Link, List } from '@navikt/ds-react';
import { useEffect } from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { KvitteringInfo } from '../../types/KvitteringInfo';
import './confirmationPage.less';

interface Props {
    kvitteringInfo?: KvitteringInfo;
    onUnmount: () => void;
}

const bem = bemUtils('confirmationPage');

const ConfirmationPage = ({ kvitteringInfo, onUnmount }: Props) => {
    const { text, intl } = useAppIntl();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    });
    const lenker = getLenker(intl.locale);

    return (
        <Page
            title={text('page.confirmation.sidetittel')}
            className={bem.block}
            topContentRenderer={() => <SoknadHeader title={text('application.title')} />}>
            <div className={bem.element('centeredContent')}>
                <CheckmarkIcon />
                <Block margin="xl">
                    <Heading level="1" size="large">
                        <AppText id="page.confirmation.tittel.1" />
                    </Heading>
                    <Block margin="m">
                        <Heading level="2" size="small" style={{ maxWidth: '20rem', margin: 'auto' }}>
                            <AppText id="page.confirmation.tittel.2" />
                        </Heading>
                    </Block>
                </Block>
            </div>
            {kvitteringInfo?.arbeidsgivere && (
                <Block margin="xl">
                    <Alert variant="warning">
                        <AppText id="page.confirmation.tittel.advarsel.list.tittel" />
                        <List style={{ marginTop: '0rem', marginBottom: '0rem' }}>
                            <List.Item>
                                <AppText id="page.confirmation.tittel.advarsel.list.item.1" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.confirmation.tittel.advarsel.list.item.2" />
                            </List.Item>
                        </List>
                    </Alert>
                </Block>
            )}

            <Block margin="xxl">
                <Heading level="2" size="medium">
                    <AppText id="page.confirmation.dinePP.info.tittel" />
                </Heading>
                <Block margin="m">
                    <BodyLong>
                        <AppText id="page.confirmation.dinePP.info.1" />
                    </BodyLong>
                    <List>
                        {kvitteringInfo?.arbeidsgivere && (
                            <List.Item>
                                <AppText id="page.confirmation.dinePP.list.item.1" />
                            </List.Item>
                        )}
                        <List.Item>
                            <AppText id="page.confirmation.dinePP.list.item.2" />
                        </List.Item>
                        <List.Item>
                            <AppText id="page.confirmation.dinePP.list.item.3" />
                        </List.Item>
                        <List.Item>
                            <AppText id="page.confirmation.dinePP.list.item.4" />
                        </List.Item>
                    </List>
                    <Block margin="xl">
                        <Link href={lenker.innsynSIF} target="_blank" className="knapp knapp--hoved">
                            <AppText id="page.confirmation.dinePP.lenke" />
                        </Link>
                    </Block>
                </Block>
            </Block>
        </Page>
    );
};

export default ConfirmationPage;
