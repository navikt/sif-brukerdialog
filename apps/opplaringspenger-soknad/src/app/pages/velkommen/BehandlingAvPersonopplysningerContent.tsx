import { Heading, Link, List, VStack } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <VStack gap="2" paddingBlock="2 0">
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall" spacing={true}>
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
                    <List.Item>
                        <AppText id="personopplysninger.4.5" />
                    </List.Item>
                </List>
                <p>
                    <AppText id="personopplysninger.5.1" />
                </p>
            </div>
            <div>
                <AppText
                    id="personopplysninger.6"
                    values={{
                        Lenke: (children) => (
                            <Link href={getLenker().personvern} target="_blank">
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
