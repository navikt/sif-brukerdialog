import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withFormik from 'storybook-formik';
import FormikDatepicker, { FormikDatepickerProps } from '../../../src/components/formik-datepicker/FormikDatepicker';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Component/FormikDatepicker',
    component: FormikDatepicker,
    decorators: [withIntl, withFormik],
} as ComponentMeta<typeof FormikDatepicker>;

const Template: ComponentStory<typeof FormikDatepicker> = (args) => <FormikDatepicker {...args} />;

export const Default = Template.bind({});
const defaultProps: FormikDatepickerProps<any, any> = {
    id: 'datepicker',
    name: 'date',
    label: 'ABc',
    description: 'Some description',
};
Default.args = {
    ...defaultProps,
};
