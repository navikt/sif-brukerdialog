import { Box, Heading, List, VStack } from '@navikt/ds-react';
import ExternalLink from '../../components/external-link/ExternalLink';
import { AppText } from '../../i18n';
import getLenker from '../../utils/lenker';

const BehandlingAvPersonopplysningerContent = () => {
    return (
        <VStack gap="space-8" paddingBlock="space-8 space-0">
            <div>
                <Heading level="3" size="xsmall" spacing={true} as="div">
                    <AppText id="personopplysninger.1" />
                </Heading>
                <p>
                    <AppText id="personopplysninger.2" />
                </p>
            </div>
            <div>
                <Heading level="3" size="xsmall" as="div">
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
                </List>
            </div>
            <Box marginBlock="space-0 space-20">
                <AppText
                    id="personopplysninger.5"
                    values={{
                        Lenke: (children) => <ExternalLink href={getLenker().personvern}>{children}</ExternalLink>,
                    }}
                />
            </Box>
        </VStack>
    );
};

export default BehandlingAvPersonopplysningerContent;
