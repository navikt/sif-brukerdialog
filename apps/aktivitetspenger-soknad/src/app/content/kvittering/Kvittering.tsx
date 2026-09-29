import { AppText, useAppIntl } from '@app/i18n';
import getLenker from '@app/lenker';
import { getAppEnv } from '@app/setup/appEnv';
import { isGitHubPages } from '@app/utils/isGitHubPages';
import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import { SøknadKvitteringPage } from '@sif/soknad-ui';

export const Kvittering = () => {
    const { text } = useAppIntl();
    // HashRouter på gh-pages: en path-basert appRootUrl (PUBLIC_PATH) fungerer ikke der.
    const appRootUrl = isGitHubPages() ? `${import.meta.env.BASE_URL}#/` : getAppEnv().PUBLIC_PATH;

    return (
        <SøknadKvitteringPage
            documentTitle={text('kvittering.documentTitle')}
            applicationTitle={text('application.title')}
            infoTittel={text('kvittering.title')}
            infoMelding={text('kvittering.message')}
            appRootUrl={appRootUrl}>
            <VStack gap="space-32">
                <div>
                    <Heading level="2" size="small" spacing>
                        <AppText id="kvitteringPage.hvaSkjerVidere" />
                    </Heading>
                    <List>
                        <List.Item>
                            <AppText
                                id="kvitteringPage.hvaSkjerVidere.1"
                                values={{
                                    Lenke: (children) => <Link href={getLenker().navMinSide}>{children}</Link>,
                                }}
                            />
                        </List.Item>
                        <List.Item>
                            <AppText
                                id="kvitteringPage.hvaSkjerVidere.2"
                                values={{
                                    Lenke: (children) => <Link href={getLenker().navMinSide}>{children}</Link>,
                                }}
                            />
                        </List.Item>
                    </List>
                </div>
                <BodyLong>
                    <AppText id="kvitteringPage.lykkeTil" />
                </BodyLong>
            </VStack>
        </SøknadKvitteringPage>
    );
};
