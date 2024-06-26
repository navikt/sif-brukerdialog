import { Tabs } from '@navikt/ds-react';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { kvitteringMessages } from '../../../app/pages/kvittering/kvitteringMesssages';
import KvitteringPage from '../../../app/pages/kvittering/KvitteringPage';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';

export default {
    title: 'Pages/KvitteringPage',
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
                <KvitteringPage onUnmount={() => null} />
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
