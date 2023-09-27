import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { withFormikWrapper, withStoryWrapper } from '../../storybook/decorators';
import DurationWeekdaysInput, { DurationWeekdaysInputProps } from './DurationWeekdaysInput';

export default {
    title: 'Component/form-element/DurationWeekdaysInput',
    component: DurationWeekdaysInput,
    decorators: [withStoryWrapper, withFormikWrapper],
} as Meta<typeof DurationWeekdaysInput>;

const Template: StoryFn<typeof DurationWeekdaysInput> = (args) => {
    return <DurationWeekdaysInput {...args} />;
};

export const Default = Template.bind({});
const args: DurationWeekdaysInputProps = {
    dateRange: ISODateRangeToDateRange('2023-05-25/2023-08-08'),
    disabledDates: [ISODateToDate('2023-05-09')],
};
Default.args = args;
