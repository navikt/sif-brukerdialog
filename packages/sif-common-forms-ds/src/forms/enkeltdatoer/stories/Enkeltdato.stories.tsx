import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import EnkeltdatoExample from './EnkeltdatoExample';

const meta: Meta<typeof EnkeltdatoExample> = {
    component: EnkeltdatoExample,
    title: 'Form/Enkeltdato',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof EnkeltdatoExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <EnkeltdatoExample />,
};
