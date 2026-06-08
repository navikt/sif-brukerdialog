import { Box, Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react-vite';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import { kvitteringMessages } from './kvitteringMesssages';
import KvitteringPage from './KvitteringPage';

export default {
    title: 'Pages/Kvittering',
    component: KvitteringPage,
    decorators: [withIntl, withRouterProvider, withAnalyticsProvider, withSøknadContextProvider],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn = () => (
    <Tabs defaultValue="steg">
        <Tabs.List>
            <Tabs.Tab value="steg" label="Steg" />
            <Tabs.Tab value="tekster" label="Tekster" />
        </Tabs.List>
        <Tabs.Panel value="steg">
            <Box marginBlock="space-32">
                <KvitteringPage />
            </Box>
        </Tabs.Panel>
        <Tabs.Panel value="tekster">
            <Box marginBlock="space-32">
                <MessagesPreview messages={kvitteringMessages} showMissingTextSummary={true} showExplanation={false} />
            </Box>
        </Tabs.Panel>
    </Tabs>
);
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
