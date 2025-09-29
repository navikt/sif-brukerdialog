import { ISODateToDate } from '@navikt/sif-common-utils';
import { Meta, StoryFn } from '@storybook/react-vite';

import { withFormikWrapper, withIntlWrapper, withStoryWrapper } from '../../../../storybook/decorators';
import DurationWeekdaysWeek from './DurationWeekdaysWeek';

export default {
    title: 'Inputs/DurationWeekdaysWeek',
    component: DurationWeekdaysWeek,
    decorators: [withStoryWrapper, withFormikWrapper, withIntlWrapper],
} as Meta<typeof DurationWeekdaysWeek>;

const Template: StoryFn<typeof DurationWeekdaysWeek> = (args: any) => {
    return <DurationWeekdaysWeek formikFieldName="days" headingLevel="2" week={args.ukestart} />;
};

export const Default = Template.bind({});
Default.args = {
    ukestart: ISODateToDate('2023-07-01'),
};
