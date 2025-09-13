import { Meta, StoryObj } from '@storybook/react-vite';
import { withIntlWrapper } from '../../../storybook/decorators/withIntlWrapper';
import DurationText from './DurationText';

const meta: Meta<typeof DurationText> = {
    component: DurationText,
    title: 'Components/DurationText',
    decorators: [withIntlWrapper],
};

export default meta;

type Story = StoryObj<typeof DurationText>;

export const Default: Story = {
    name: 'Standard',
    render: () => <DurationText duration={{ hours: '2' }} />,
};
