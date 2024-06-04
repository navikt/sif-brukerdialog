import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import UtenlandsoppholdExample from './UtenlandsoppholdExample';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

const meta: Meta<typeof UtenlandsoppholdExample> = {
    component: UtenlandsoppholdExample,
    title: 'Form/Utenlandsopphold',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof UtenlandsoppholdExample>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        (await canvas.findByText('Form')).click();

        const fom = dateFormatter.compact(dayjs().subtract(3, 'days').toDate());
        const tom = dateFormatter.compact(dayjs().add(3, 'days').toDate());

        /** EØS-land */
        await userEvent.type(await canvas.findByRole('textbox', { name: 'Fra og med' }), fom);
        await userEvent.tab();
        await userEvent.type(await canvas.findByRole('textbox', { name: 'Til og med' }), tom);
        await userEvent.tab();
        await userEvent.selectOptions(await canvas.findByRole('combobox', { name: 'Velg land' }), 'FRA');
        await userEvent.tab();
        await userEvent.click(await canvas.findByRole('button', { name: 'Ok' }));

        /** Utenfor EØS */
        await userEvent.selectOptions(await canvas.findByRole('combobox', { name: 'Velg land' }), 'ALB');
        await userEvent.tab();

        const innlagtSpm = await canvas.findByRole('group', {
            name: 'Er, eller skal, barnet være innlagt i helseinstitusjon i Albania?',
        });
        (await within(innlagtSpm).findByLabelText('Nei')).click();

        const sammenSpm = await canvas.findByRole('group', {
            name: 'Skal du være sammen barnet i Albania?',
        });
        (await within(sammenSpm).findByLabelText('Nei')).click();
    },
    render: () => <UtenlandsoppholdExample excludeInnlagtQuestion={false} />,
};
export const UtenSpmOm: Story = {
    name: 'Uten spørsmål om innleggelse ',
    render: () => <UtenlandsoppholdExample excludeInnlagtQuestion={true} />,
};
