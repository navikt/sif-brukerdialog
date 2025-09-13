import { Meta, StoryFn } from '@storybook/react-vite';
import VelkommenPage from './VelkommenPage';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import { velkommenPageMessages } from './velkommenPageMessages';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Box, Tabs } from '@navikt/ds-react';

export default {
    title: 'Pages/Velkommen',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider, withSøknadContextProvider],
} as Meta<typeof VelkommenPage>;

const Template: StoryFn<typeof VelkommenPage> = () => (
    <Tabs defaultValue="steg">
        <Tabs.List>
            <Tabs.Tab value="steg" label="Steg" />
            <Tabs.Tab value="tekster" label="Tekster" />
        </Tabs.List>
        <Tabs.Panel value="steg">
            <Box marginBlock="8">
                <VelkommenPage />
            </Box>
        </Tabs.Panel>
        <Tabs.Panel value="tekster">
            <Box marginBlock="8">
                <MessagesPreview
                    messages={velkommenPageMessages}
                    showMissingTextSummary={true}
                    showExplanation={false}
                />
            </Box>
        </Tabs.Panel>
    </Tabs>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
