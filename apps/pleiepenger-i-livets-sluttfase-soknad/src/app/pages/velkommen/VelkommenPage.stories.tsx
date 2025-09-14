import { Meta, StoryFn } from '@storybook/react-vite';

import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';
import VelkommenPage from './VelkommenPage';

export default {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider, withSøknadContextProvider],
} as Meta<typeof VelkommenPage>;

const Template: StoryFn<typeof VelkommenPage> = () => <VelkommenPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
