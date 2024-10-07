import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { kvitteringMessages } from './kvitteringMesssages';
import KvitteringPage from './KvitteringPage';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';

export default {
    title: 'Pages/Kvittering',
    component: KvitteringPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn = () => (
    <Tabs defaultValue="steg">
        <Tabs.List>
            <Tabs.Tab value="steg" label="Steg" />
            <Tabs.Tab value="tekster" label="Tekster" />
        </Tabs.List>
        <Tabs.Panel value="steg">
            <Block margin="xl">
                <KvitteringPage />
            </Block>
        </Tabs.Panel>
        <Tabs.Panel value="tekster">
            <Block margin="xl">
                <MessagesPreview messages={kvitteringMessages} showMissingTextSummary={true} showExplanation={false} />
            </Block>
        </Tabs.Panel>
    </Tabs>
);
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
