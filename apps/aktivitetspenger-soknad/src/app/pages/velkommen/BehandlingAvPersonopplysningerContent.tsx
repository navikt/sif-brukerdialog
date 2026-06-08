import { AppText } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { Heading, Link, List, VStack } from '@navikt/ds-react';
import React from 'react';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    const lenker = useLenker();

    return (
        <VStack gap="space-8" paddingBlock="space-8 space-0">
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall">
                    <AppText id="personopplysninger.3" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.4" />
                </p>

                <List>
                    <List.Item>
                        <AppText id="personopplysninger.4.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.3" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.4.4" />
                    </List.Item>
                </List>
            </div>
            <div>
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link href={lenker.navPersonvernerklaering} target="_blank" rel="noopener noreferrer">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </div>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
