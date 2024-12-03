import { Heading, HStack, Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import getLenker from '../../lenker';
import { useEffect } from 'react';
import { KvitteringInfo } from '../../types/KvitteringInfo';
import { AppText, useAppIntl } from '../../i18n';

interface Props {
    kvitteringInfo?: KvitteringInfo;
    onUnmount: () => void;
}

const KvitteringPage = ({ kvitteringInfo, onUnmount }: Props) => {
    const { text, intl } = useAppIntl();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    });

    return (
        <Page title={text('page.kvittering.sidetittel')}>
            <div data-testid="kvittering-page">
                <HStack justify="center" marginBlock="0 8" role="presentation" aria-hidden="true">
                    <CheckmarkIcon />
                </HStack>

                <Heading level="1" size="large">
                    <AppText id="page.kvittering.tittel" />
                </Heading>
                <Block margin="xl">
                    <Heading size="medium" level="2">
                        <AppText id="page.kvittering.info.tittel" />
                    </Heading>
                    <Checklist>
                        {kvitteringInfo?.arbeidsgivere && (
                            <li>
                                <AppText
                                    id={'page.kvittering.list.item.1'}
                                    values={{ antall: kvitteringInfo.arbeidsgivere.length }}
                                />
                            </li>
                        )}
                        <li>
                            <AppText id="page.kvittering.list.item.2" />
                        </li>
                        <li>
                            <AppText
                                id="page.kvittering.list.item.3"
                                values={{
                                    MinSideLenke: (children) => (
                                        <Link href={getLenker(intl.locale).minSide} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                    SaksbehandlingstidLenke: (children) => (
                                        <Link href={getLenker(intl.locale).saksbehandlingstider} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </li>
                    </Checklist>
                </Block>
            </div>
        </Page>
    );
};

export default KvitteringPage;
