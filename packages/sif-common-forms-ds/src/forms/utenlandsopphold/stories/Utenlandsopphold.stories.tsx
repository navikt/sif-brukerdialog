import { Meta, StoryObj } from '@storybook/react-vite';
import { dateFormatter } from '@navikt/sif-common-utils';
import { userEvent, within } from '@storybook/testing-library';
import dayjs from 'dayjs';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import UtenlandsoppholdExample from './UtenlandsoppholdExample';

const meta: Meta<typeof UtenlandsoppholdExample> = {
    component: UtenlandsoppholdExample,
    title: 'Form/Utenlandsopphold',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof UtenlandsoppholdExample>;

export const Default: Story = {
    name: 'Utvidet',
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        (await canvas.findByText('Form')).click();

        const fom = dateFormatter.compact(dayjs().subtract(3, 'days').toDate());
        const tom = dateFormatter.compact(dayjs().add(3, 'days').toDate());

        await userEvent.type(await canvas.findByRole('textbox', { name: 'Fra og med' }), fom);
        await userEvent.tab();
        await userEvent.type(await canvas.findByRole('textbox', { name: 'Til og med' }), tom);
        await userEvent.tab();
        await userEvent.selectOptions(await canvas.findByRole('combobox', { name: 'Velg land' }), 'FRA');
        await userEvent.tab();
        const sammenSpm = await canvas.findByRole('group', {
            name: 'Er barnet sammen med deg til Frankrike?',
        });
        (await within(sammenSpm).findByLabelText('Nei')).click();
    },
    render: () => <UtenlandsoppholdExample variant="utvidet" />,
};

export const UtenSpmOm: Story = {
    name: 'Enkel - kun periode og land',
    render: () => <UtenlandsoppholdExample variant="enkel" />,
};
