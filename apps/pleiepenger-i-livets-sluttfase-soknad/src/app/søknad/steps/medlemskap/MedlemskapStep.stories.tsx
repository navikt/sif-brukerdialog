import { Meta, StoryObj } from '@storybook/react-vite';

import { withAnalyticsProvider } from '../../../../storybook/decorators/withAnalyticsProvider';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import MedlemskapStep from './MedlemskapStep';

const meta: Meta<typeof MedlemskapStep> = {
    title: 'Steps/Medlemskap',
    component: MedlemskapStep,
    decorators: [withIntl, (Story) => withSøknadContextProvider(Story), withAnalyticsProvider, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof MedlemskapStep>;

export const Default: Story = {
    args: {},
};
