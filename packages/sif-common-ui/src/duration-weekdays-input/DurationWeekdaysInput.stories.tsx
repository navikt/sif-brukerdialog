import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { getDatesInDateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { withFormikWrapper, withStoryWrapper } from '../../storybook/decorators';
import DurationWeekdaysInput from './DurationWeekdaysInput';

export default {
    title: 'Component/form-element/DurationWeekdaysInput',
    component: DurationWeekdaysInput,
    decorators: [withStoryWrapper, withFormikWrapper],
} as Meta<typeof DurationWeekdaysInput>;

const Template: StoryFn<typeof DurationWeekdaysInput> = (args) => {
    return (
        <DurationWeekdaysInput
            {...args}
            validateDate={() => {
                return 'abc';
            }}
        />
    );
};

const dateRange = ISODateRangeToDateRange('2023-05-25/2023-08-08');
const disabledDates = getDatesInDateRange(dateRange).filter((d) => [1, 3, 4].includes(dayjs(d).day()));

export const Default = Template.bind({});

Default.args = {
    dateRange,
    disabledDates: [],
};

export const DisabledDates = Template.bind({});
DisabledDates.args = {
    dateRange,
    disabledDates,
};
