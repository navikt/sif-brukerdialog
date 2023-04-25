import { Meta, StoryFn } from '@storybook/react';
import { FormikDateIntervalPicker } from '../../../src';
import { DateIntervalPickerProps } from '../../../src/components/formik-date-interval-picker/FormikDateIntervalPicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

const meta: Meta<typeof FormikDateIntervalPicker> = {
    title: 'Component/FormikDateIntervalPicker',
    component: FormikDateIntervalPicker,
    decorators: [withIntl, withFormikWrapper],
};

export default meta;

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
