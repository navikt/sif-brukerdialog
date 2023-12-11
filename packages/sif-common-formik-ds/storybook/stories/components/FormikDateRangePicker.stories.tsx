import { Meta, StoryFn } from '@storybook/react';
import FormikDateRangePicker, {
    FormikDateRangePickerProps,
} from '../../../src/components/formik-date-range-picker/FormikDateRangePicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

const meta: Meta<typeof FormikDateRangePicker> = {
    title: 'Component/FormikDateRangePicker',
    component: FormikDateRangePicker,
    decorators: [withIntl, withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikDateRangePicker> = (args) => <FormikDateRangePicker {...args} />;

export const Default = Template.bind({});

const defaultProps: FormikDateRangePickerProps<any, any> = {
    legend: 'Choose date',
    fromInputProps: {
        label: 'From',
        name: 'from',
    },
    toInputProps: {
        label: 'To',
        name: 'to',
    },
    dropdownCaption: true,
    minDate: new Date('2023-11-06'),
    maxDate: new Date('2023-11-06'),
};

Default.args = {
    ...defaultProps,
};
Default.parameters = {
    ...defaultProps,
    formik: {
        initialValues: {
            from: '',
            to: '',
        },
        errors: {
            from: 'abc',
        },
    },
};
