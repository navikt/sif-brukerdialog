import { Meta, StoryFn } from '@storybook/react-vite';
import { withIntl } from '../../decorators/withIntl';
import ValidationExample from '../validation/ValidationExample';

const meta: Meta<typeof ValidationExample> = {
    title: 'Validation/Examples',
    component: ValidationExample,
    decorators: [withIntl],
};

export default meta;

const Template: StoryFn<typeof ValidationExample> = () => <ValidationExample />;

export const Default = Template.bind({});
