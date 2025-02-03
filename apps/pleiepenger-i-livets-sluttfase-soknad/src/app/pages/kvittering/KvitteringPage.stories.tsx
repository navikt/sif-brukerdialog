import { Meta, StoryFn } from '@storybook/react';
import KvitteringPage from '../../../app/pages/kvittering/KvitteringPage';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';

export default {
    title: 'Pages/KvitteringPage',
    component: KvitteringPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider, (Story) => withSøknadContextProvider(Story)],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn<typeof KvitteringPage> = () => <KvitteringPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
