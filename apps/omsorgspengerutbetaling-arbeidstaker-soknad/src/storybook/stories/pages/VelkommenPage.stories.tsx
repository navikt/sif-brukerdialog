import { Meta, StoryFn } from '@storybook/react-vite';

import VelkommenPage from '../../../app/pages/velkommen/VelkommenPage';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider, withSøknadContextProvider],
} as Meta<typeof VelkommenPage>;

const Template: StoryFn<typeof VelkommenPage> = () => <VelkommenPage />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
