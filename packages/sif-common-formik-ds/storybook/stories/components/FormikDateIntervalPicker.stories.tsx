import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { FormikDateIntervalPicker } from '../../../src';
import { DateIntervalPickerProps } from '../../../src/components/formik-date-interval-picker/FormikDateIntervalPicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Component/FormikDateIntervalPicker',
    component: FormikDateIntervalPicker,
    decorators: [withIntl, withFormikWrapper],
} as Meta<typeof FormikDateIntervalPicker>;

const Template: StoryFn<typeof FormikDateIntervalPicker> = (args) => <FormikDateIntervalPicker {...args} />;

export const Default = Template.bind({});

const defaultProps: DateIntervalPickerProps<any, any> = {
    legend: 'Choose date',
    fromDatepickerProps: {
        label: 'From',
        name: 'from',
    },
    toDatepickerProps: {
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
            from: '2020-01-01',
        },
    },
};
