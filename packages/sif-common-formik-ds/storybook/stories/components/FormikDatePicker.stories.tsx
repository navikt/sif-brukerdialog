import { Meta, StoryFn } from '@storybook/react';
import FormikDatepicker, { FormikDatepickerProps } from '../../../src/components/formik-datepicker/FormikDatepicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

import { getDateValidator } from '../../../src/validation';

const meta: Meta<typeof FormikDatepicker> = {
    title: 'Component/FormikDatepicker',
    component: FormikDatepicker,
    decorators: [withIntl, withFormikWrapper],
};

export default meta;

const Template: StoryFn<typeof FormikDatepicker> = (args) => <FormikDatepicker {...args} />;
const validator = getDateValidator({
    required: true,
    min: new Date(2015, 0, 1),
    max: new Date(),
    onlyWeekdays: true,
});
export const Default = Template.bind({});
const defaultProps: FormikDatepickerProps<any, any> = {
    id: 'datepicker',
    name: 'date',
    label: 'ABc',
    description: 'Some description',
    dropdownCaption: true,
    fromDate: new Date(2020, 1, 1),
    toDate: new Date(2030, 1, 10),
    disabledDaysOfWeek: {
        dayOfWeek: [2],
    },
    disabledDateRanges: [{ from: new Date(2021, 1, 1), to: new Date(2021, 1, 10) }],
    validate: validator,
};
Default.args = {
    ...defaultProps,
};
