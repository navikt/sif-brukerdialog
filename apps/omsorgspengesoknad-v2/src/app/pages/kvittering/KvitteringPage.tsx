import { AppText, useAppIntl } from '@app/i18n';
import { Button, Link } from '@navikt/ds-react';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { InfoList, Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import getLenker from '../../lenker';

export const KvitteringPage = () => {
    const { intl, text } = useAppIntl();
    const path = getRequiredEnv(EnvKey.PUBLIC_PATH);

    const onRestart = () => {
        window.location.replace(path);
    };

    return (
        <ApplicationPage
            documentTitle={text('page.kvittering.sidetittel')}
            applicationTitle={text('application.title')}>
            <Kvittering tittel={text('page.kvittering.tittel')}>
                <InfoList heading={text('page.kvittering.info.tittel')}>
                    <li>
                        <AppText id="page.kvittering.list.item.1" />
                    </li>
                    <li>
                        <AppText id="page.kvittering.list.item.2" />
                    </li>
                    <li>
                        <AppText id="page.kvittering.list.item.3" />
                    </li>
                    <li>
                        <AppText
                            id="page.kvittering.list.item.4"
                            values={{
                                MinSideLenke: (children) => (
                                    <Link
                                        href={getLenker(intl.locale).minSide}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {children}
                                    </Link>
                                ),
                                SaksbehandlingstidLenke: (children) => (
                                    <Link
                                        href={getLenker(intl.locale).saksbehandlingstider}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </li>
                </InfoList>
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </Kvittering>
        </ApplicationPage>
    );
};
