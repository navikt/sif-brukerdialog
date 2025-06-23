import { Meta, StoryObj } from '@storybook/react-vite';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import MedlemskapFormExample from './MedlemskapFormExample';

const meta: Meta<typeof MedlemskapFormExample> = {
    component: MedlemskapFormExample,
    title: 'Stegskjema/Medlemskap',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof MedlemskapFormExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <MedlemskapFormExample />,
};
