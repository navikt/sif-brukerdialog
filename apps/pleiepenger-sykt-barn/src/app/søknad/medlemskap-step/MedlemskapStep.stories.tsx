import { Meta, StoryObj } from '@storybook/react-vite';
import { withStepWrapper } from '../../../storybook/decorators';
import MedlemskapStep from './MedlemskapStep';

const meta: Meta<typeof MedlemskapStep> = {
    title: 'Step/MedlemskapStep',
    component: MedlemskapStep,
    decorators: [withStepWrapper],
};

export default meta;

type Story = StoryObj<typeof MedlemskapStep>;

export const Default: Story = {
    args: {},
};
