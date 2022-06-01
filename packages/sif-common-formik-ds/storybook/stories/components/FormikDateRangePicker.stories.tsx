import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikDateRangePicker, {
    FormikDateRangePickerProps,
} from '../../../src/components/formik-date-range-picker/FormikDateRangePicker';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Component/FormikDateRangePicker',
    component: FormikDateRangePicker,
    decorators: [withIntl, withFormik],
} as ComponentMeta<typeof FormikDateRangePicker>;

const Template: ComponentStory<typeof FormikDateRangePicker> = (args) => <FormikDateRangePicker {...args} />;

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
