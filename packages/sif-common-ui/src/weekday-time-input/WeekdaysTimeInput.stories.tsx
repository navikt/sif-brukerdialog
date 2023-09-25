import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange, Weekday } from '@navikt/sif-common-utils/lib';
import { withFormikWrapper, withIntl, withRouterProvider } from '../../storybook/decorators';
import WekdaysTimeInput from './WeekdaysTimeInput';

export default {
    title: 'Component/form-element/WekdaysTimeInput',
    component: WekdaysTimeInput,
    decorators: [withIntl, withFormikWrapper, withRouterProvider],
} as Meta<typeof WekdaysTimeInput>;

const Template: StoryFn<typeof WekdaysTimeInput> = (args) => {
    return (
        <WekdaysTimeInput
            timeInputNames={{
                [Weekday.monday]: 'monday',
                [Weekday.tuesday]: 'tuesday',
                [Weekday.wednesday]: 'wednesday',
                [Weekday.thursday]: 'thursday',
                [Weekday.friday]: 'friday',
            }}
            labels={{
                [Weekday.monday]: 'Mandag',
                [Weekday.tuesday]: 'Tirsdag',
                [Weekday.wednesday]: 'Onsdag',
                [Weekday.thursday]: 'Torsdag',
                [Weekday.friday]: 'Fredag',
            }}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    dateRange: ISODateRangeToDateRange('2023-07-01/2023-09-30'),
};
