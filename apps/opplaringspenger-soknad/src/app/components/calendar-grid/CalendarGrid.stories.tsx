import { Meta, StoryObj } from '@storybook/react-vite';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { withIntl } from '../../../storybook/decorators/withIntl';
import CalendarGrid from './CalendarGrid';

const meta: Meta<typeof CalendarGrid> = {
    title: 'Components/CalendarGrid',
    component: CalendarGrid,
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof CalendarGrid>;

export const Default: Story = {
    args: {
        month: {
            from: ISODateToDate('2024-05-01'),
            to: ISODateToDate('2024-05-31'),
        },
        dateContentRenderer: (date: Date) => date.getDate(),
    },
};
