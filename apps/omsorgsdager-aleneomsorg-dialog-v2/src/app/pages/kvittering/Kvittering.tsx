import { AppText, useAppIntl } from '@app/i18n';
import { getAppEnv } from '@app/setup/appEnv';
import { Link, VStack } from '@navikt/ds-react';
import { InfoList, SøknadKvitteringPage } from '@sif/soknad-ui';
import { getSifLenker } from '@sif/soknad-ui/lenker';
import { ReactNode } from 'react';

export const Kvittering = () => {
    const { locale, text } = useAppIntl();
    return (
        <SøknadKvitteringPage
            documentTitle={text('kvittering.documentTitle')}
            applicationTitle={text('application.title')}
            infoTittel={text('kvittering.tittel')}
            appRootUrl={getAppEnv().PUBLIC_PATH}>
            <VStack gap="space-24">
                <InfoList heading={text('kvittering.info.tittel')}>
                    <li>
                        <AppText id="kvittering.info.1" />
                    </li>
                    <li>
                        <AppText id="kvittering.info.2" />
                    </li>
                    <li>
                        <AppText
                            id="kvittering.info.3"
                            values={{
                                Lenke: (children: ReactNode) => (
                                    <Link
                                        href={getSifLenker(locale === 'nn' ? 'nn' : 'nb').navSaksbehandlingstider}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </li>
                </InfoList>
            </VStack>
        </SøknadKvitteringPage>
    );
};
