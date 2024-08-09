import { Heading, Link, List, VStack } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    return (
        <VStack gap="2" paddingBlock="2 0">
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
            <div>
                <p style={{ margin: '0' }}>
                    <AppText
                        id="page.velkommen.personopplysninger.5"
                        values={{
                            Lenke: (children: React.ReactNode) => (
                                <Link href={getLenker().personvern} target="_blank">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </p>
            </div>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
