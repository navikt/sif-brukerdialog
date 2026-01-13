import { Meta, StoryFn } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import VelkommenPage from './VelkommenPage';

export default {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withAnalyticsProvider, withSøknadContextProvider],
} as Meta<typeof VelkommenPage>;

const Template: StoryFn<typeof VelkommenPage> = () => <VelkommenPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
