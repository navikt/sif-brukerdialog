import { Heading, HStack, Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import getLenker from '../../lenker';
import { KvitteringInfo } from '../../types/KvitteringInfo';
import { AppText, useAppIntl } from '../../i18n';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../../søknad/context/action/actionCreator';

interface Props {
    kvitteringInfo?: KvitteringInfo;
}

const KvitteringPage = ({ kvitteringInfo }: Props) => {
    const { text, intl } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });

    return (
        <Page title={text('page.kvittering.sidetittel')}>
            <div data-testid="kvittering-page">
                <HStack justify="center" gap="8" marginBlock="0 8" role="presentation" aria-hidden="true">
                    <CheckmarkIcon />
                    <Heading level="1" size="large">
                        <AppText id="page.kvittering.tittel" />
                    </Heading>
                </HStack>

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
                                    Lenke: (children) => (
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
