import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FormikDateRangePicker, {
    FormikDateRangePickerProps,
} from '../../../src/components/formik-date-range-picker/FormikDateRangePicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Component/FormikDateRangePicker',
    component: FormikDateRangePicker,
    decorators: [withIntl, withFormikWrapper],
} as Meta<typeof FormikDateRangePicker>;

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
