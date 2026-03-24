import { dateFormatter } from '@navikt/sif-common-utils';
import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../../storybook/decorators/withRouter';
import { withSøknadContextProvider } from '../../../../storybook/decorators/withSøknadContext';
import TidEnkeltdagDialog from './TidEnkeltdagDialog';
import { TidEnkeltdagFormProps } from './TidEnkeltdagForm';

const meta: Meta<typeof TidEnkeltdagDialog> = {
    title: 'Modules/TidEnkeltdagDialog',
    component: TidEnkeltdagDialog,
    decorators: [withIntl, withRouterProvider, (Story) => withSøknadContextProvider(Story, {})],
};

export default meta;

type Story = StoryObj<typeof TidEnkeltdagDialog>;

const defaultFormProps: TidEnkeltdagFormProps = {
    dato: new Date(2026, 1, 11),
    tid: undefined,
    periode: {
        from: new Date(2026, 1, 1),
        to: new Date(2026, 1, 28),
    },
    tidOpprinnelig: {
        hours: '4',
        minutes: '0',
    },
    hvorMyeSpørsmålRenderer: (dato) => `Hvor mye var barnet i omsorgstilbud ${dateFormatter.dayDateMonthYear(dato)}?`,
    beskrivelseRenderer: () =>
        `Legg inn timer og minutter barnet var i omsorgstilbudet, eller kryss av for at barnet ikke var det denne dagen.`,
    erIkkeIOmsorgstilbudLabelRenderer: () => `Barnet var ikke i omsorgstilbud denne dagen`,
    onCancel: () => null,
    onSubmit: () => null,
};

export const MedOpprinneligTid: Story = {
    args: {
        open: true,
        dialogTitle: 'Tid i omsorgstilbud 11. februar 2026',
        formProps: { ...defaultFormProps },
    },
};
export const UtenOpprinneligTid: Story = {
    args: {
        open: true,
        dialogTitle: 'Tid i omsorgstilbud 11. februar 2026',
        formProps: {
            ...defaultFormProps,
            tidOpprinnelig: undefined,
        },
    },
};
export const MedEndretTid: Story = {
    args: {
        open: true,
        dialogTitle: 'Tid i omsorgstilbud 11. februar 2026',
        formProps: {
            ...defaultFormProps,
            tid: {
                hours: '5',
            },
            tidOpprinnelig: undefined,
        },
    },
};
