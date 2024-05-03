import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import InvalidStepMessage from './InvalidStepMessage';

const meta: Meta<typeof InvalidStepMessage> = {
    title: 'Components/InvalidStepMessage',
    component: InvalidStepMessage,
    decorators: [withIntl, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof InvalidStepMessage>;

export const Default: Story = {
    args: {
        stepRoute: 'route',
        stepTitle: 'Tittel på steg',
    },
};
