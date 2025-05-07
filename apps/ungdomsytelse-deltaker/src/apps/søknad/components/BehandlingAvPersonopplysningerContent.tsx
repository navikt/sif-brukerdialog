import { Heading, List, VStack } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';
import ExternalLink from './external-link/ExternalLink';

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
                        Lenke: (children) => <ExternalLink href={getLenker().personvern}>{children}</ExternalLink>,
                    }}
                />
            </div>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
