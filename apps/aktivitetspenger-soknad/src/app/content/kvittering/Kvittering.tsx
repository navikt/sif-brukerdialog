import { AppText, useAppIntl } from '@app/i18n';
import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import { SøknadKvitteringPage } from '@sif/soknad-ui';
import getLenker from '../../lenker';

export const Kvittering = () => {
    const { text } = useAppIntl();

    return (
        <SøknadKvitteringPage
            documentTitle={text('kvittering.documentTitle')}
            applicationTitle={text('application.title')}
            infoTittel={text('kvittering.title')}
            infoMelding={text('kvittering.message')}
            appRootUrl={import.meta.env.BASE_URL}>
            <VStack gap="space-32">
                <div>
                    <Heading level="3" size="small" spacing>
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
