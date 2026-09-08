import { AppText } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

const BehandlingAvPersonopplysningerContent = () => {
    const lenker = useLenker();

    return (
        <VStack gap="space-24" paddingBlock="space-8 space-0">
            <BodyLong>
                <AppText id="personopplysninger.1" />
            </BodyLong>

            <div>
                <Heading level="3" size="xsmall" spacing>
                    <AppText id="personopplysninger.2" />
                </Heading>

                <List>
                    <List.Item>
                        <AppText id="personopplysninger.2.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.2.2" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.2.3" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.2.4" />
                    </List.Item>
                </List>
            </div>

            <div>
                <Heading level="3" size="xsmall" spacing>
                    <AppText id="personopplysninger.3" />
                </Heading>
                <List>
                    <List.Item>
                        <AppText id="personopplysninger.3.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="personopplysninger.3.2" />
                    </List.Item>
                </List>
            </div>

            <BodyLong>
                <AppText
                    id="personopplysninger.4"
                    values={{
                        Lenke: (children: ReactNode) => (
                            <Link href={lenker.navPersonvernerklaering} target="_blank" rel="noopener noreferrer">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </BodyLong>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
