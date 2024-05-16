import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import LovbestemtFerieListe from './LovbestemtFerieListe';
import { ISODateToDate } from '@navikt/sif-common-utils';

const meta: Meta<typeof LovbestemtFerieListe> = {
    title: 'Components/LovbestemtFerieListe',
    component: LovbestemtFerieListe,
    decorators: [withIntl, withRouterProvider],
};

export default meta;

type Story = StoryObj<typeof LovbestemtFerieListe>;

export const Default: Story = {
    args: {
        onEdit: () => null,
        onDelete: () => null,
        onUndoDelete: () => null,
        perioder: [
            {
                from: ISODateToDate('2021-01-01'),
                to: ISODateToDate('2021-01-05'),
                skalHaFerie: true,
                liggerISak: true,
            },
            {
                from: ISODateToDate('2021-02-01'),
                to: ISODateToDate('2021-02-05'),
                skalHaFerie: false,
                liggerISak: true,
            },
            {
                from: ISODateToDate('2021-03-01'),
                to: ISODateToDate('2021-03-05'),
                skalHaFerie: true,
                liggerISak: false,
            },
        ],
    },
};
