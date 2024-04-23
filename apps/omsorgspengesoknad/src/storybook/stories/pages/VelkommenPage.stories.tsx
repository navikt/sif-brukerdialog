import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import VelkommenPage from '../../../app/pages/velkommen/VelkommenPage';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { velkommenPageMessages } from '../../../app/pages/velkommen/velkommenPageMessages';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { Tabs } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

export default {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider, withSøknadContextProvider],
} as Meta<typeof VelkommenPage>;

const Template: StoryFn<typeof VelkommenPage> = () => (
    <Tabs defaultValue="steg">
        <Tabs.List>
            <Tabs.Tab value="steg" label="Steg" />
            <Tabs.Tab value="tekster" label="Tekster" />
        </Tabs.List>
        <Tabs.Panel value="steg" style={{ maxWidth: '50rem' }}>
            <Block margin="xl">
                <VelkommenPage />
            </Block>
        </Tabs.Panel>
        <Tabs.Panel value="tekster" style={{ maxWidth: '50rem' }}>
            <Block margin="xl">
                <MessagesPreview
                    messages={velkommenPageMessages}
                    showMissingTextSummary={true}
                    showExplanation={false}
                />
            </Block>
        </Tabs.Panel>
    </Tabs>
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
