import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import WeekWithDays from './WeekWithDays';

export default {
    title: 'Component/layout/WeekWithDays',
    component: WeekWithDays,
} as Meta<typeof WeekWithDays>;

const Template: StoryFn<typeof WeekWithDays> = (args) => {
    return <WeekWithDays week={ISODateRangeToDateRange('2023-02-06/2023-02-12')} hideWeekend={true} />;
};

export const Default = Template.bind({});
Default.args = {
    dateRange: ISODateRangeToDateRange('2023-07-01/2023-09-30'),
};
