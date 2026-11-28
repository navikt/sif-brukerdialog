import { AppText, useAppIntl } from '@app/i18n';
import { Heading, Link, List, VStack } from '@navikt/ds-react';
import { getSifLenker } from '@sif/soknad-ui/lenker';
import { ReactNode } from 'react';

export const BehandlingAvPersonopplysningerContent = () => {
    const { locale } = useAppIntl();

    return (
        <VStack gap="space-8" paddingBlock="space-8 space-0">
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="page.velkommen.personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="page.velkommen.personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="page.velkommen.personopplysninger.3" />
                </Heading>
                <p>
                    <AppText id="page.velkommen.personopplysninger.4" />
                </p>
                <List>
                    <List.Item>
                        <AppText id="page.velkommen.personopplysninger.4.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.personopplysninger.4.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.personopplysninger.4.3" />
                    </List.Item>
                    <List.Item>
                        <AppText id="page.velkommen.personopplysninger.4.4" />
                    </List.Item>
                </List>
            </div>
            <p style={{ margin: '0' }}>
                <AppText
                    id="page.velkommen.personopplysninger.5"
                    values={{
                        Lenke: (children: ReactNode) => (
                            <Link
                                href={getSifLenker(locale === 'nn' ? 'nn' : 'nb').navPersonvernerklaering}
                                target="_blank"
                                rel="noopener noreferrer">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </p>
        </VStack>
    );
};
