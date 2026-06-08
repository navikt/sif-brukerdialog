import { Meta, StoryFn } from '@storybook/react-vite';

import KvitteringPage from '../../../app/pages/kvittering/KvitteringPage';
import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';

export default {
    title: 'Pages/KvitteringPage',
    component: KvitteringPage,
    decorators: [withIntl, withRouterProvider, withAnalyticsProvider],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn<typeof KvitteringPage> = () => <KvitteringPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
