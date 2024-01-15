import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { withFormikWrapper, withStoryWrapper } from '../../../storybook/decorators';
import DurationWeekdaysWeek from './DurationWeekdaysWeek';

export default {
    title: 'Component/form-element/DurationWeekdaysWeek',
    component: DurationWeekdaysWeek,
    decorators: [withStoryWrapper, withFormikWrapper],
} as Meta<typeof DurationWeekdaysWeek>;

const Template: StoryFn<typeof DurationWeekdaysWeek> = (args) => {
    return <DurationWeekdaysWeek week={args.ukestart} />;
};

export const Default = Template.bind({});
Default.args = {
    ukestart: ISODateToDate('2023-07-01'),
};
