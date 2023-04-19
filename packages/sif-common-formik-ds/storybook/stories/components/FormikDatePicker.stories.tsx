import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import FormikDatepicker, { FormikDatepickerProps } from '../../../src/components/formik-datepicker/FormikDatepicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Component/FormikDatepicker',
    component: FormikDatepicker,
    decorators: [withIntl, withFormikWrapper],
} as Meta<typeof FormikDatepicker>;

const Template: StoryFn<typeof FormikDatepicker> = (args) => <FormikDatepicker {...args} />;

export const Default = Template.bind({});
const defaultProps: FormikDatepickerProps<any, any> = {
    id: 'datepicker',
    name: 'date',
    label: 'ABc',
    description: 'Some description',
    error: 'Dette er en feil',
};
Default.args = {
    ...defaultProps,
};
