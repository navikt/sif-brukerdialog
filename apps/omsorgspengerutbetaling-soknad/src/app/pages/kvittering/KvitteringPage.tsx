import { Heading, HStack, Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';

const KvitteringPage = () => {
    const { text, intl } = useAppIntl();
    const { dispatch } = useSøknadContext();
    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
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
                        <li>
                            <AppText id="page.kvittering.info.1" />
                        </li>
                        <li>
                            <AppText id="page.kvittering.info.2" />
                        </li>
                        <li>
                            <p>
                                <AppText
                                    id="page.kvittering.info.3"
                                    values={{
                                        Lenke: (children: React.ReactNode) => (
                                            <Link href={getLenker(intl.locale).saksbehandlingstider} target="_blank">
                                                {children}
                                            </Link>
                                        ),
                                    }}
                                />
                            </p>
                        </li>
                    </Checklist>
                </Block>
            </div>
        </Page>
    );
};

export default KvitteringPage;
