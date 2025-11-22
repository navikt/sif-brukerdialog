import { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import OpplysningerOmPleietrengendeStep from './OpplysningerOmPleietrengendeStep';

const meta: Meta<typeof OpplysningerOmPleietrengendeStep> = {
    title: 'Steps/Opplysninger om pleietrengende',
    component: OpplysningerOmPleietrengendeStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAnalyticsProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof OpplysningerOmPleietrengendeStep>;

export const Default: Story = {
    args: {},
};
