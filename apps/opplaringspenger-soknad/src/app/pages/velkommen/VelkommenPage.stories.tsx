import { Meta, StoryFn } from '@storybook/react';
import VelkommenPage from './VelkommenPage';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withSøknadContextProvider } from '../../../storybook/decorators/withSøknadContext';

export default {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider, withSøknadContextProvider],
} as Meta<typeof VelkommenPage>;

const Template: StoryFn<typeof VelkommenPage> = () => <VelkommenPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
