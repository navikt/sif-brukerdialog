import { Heading, Link, List, VStack } from '@navikt/ds-react';
import React from 'react';

import { AppText } from '../../i18n';
import { getLenker } from '../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <VStack gap="6" paddingBlock="2 0">
            <div>
                <Heading level="3" size="small">
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading size="small" level="3">
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
                    <List.Item>
                        <AppText id="personopplysninger.4.6" />
                    </List.Item>
                </List>
            </div>

            <div>
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Link: (children) => (
                            <Link href={getLenker().personvernerklæring} target="_blank">
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
