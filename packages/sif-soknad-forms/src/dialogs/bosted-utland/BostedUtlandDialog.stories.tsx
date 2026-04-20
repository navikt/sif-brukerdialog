import { Box } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { type ReactNode, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { sifSoknadFormsMessages } from '../../i18n';
import { BostedUtlandFormDialog } from './BostedUtlandDialog';
import type { BostedUtland } from './index';

type StoryProps = {
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
};

const today = dayjs();

const alleBosteder: BostedUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: today.subtract(8, 'month').toDate(),
            to: today.subtract(6, 'month').subtract(10, 'day').toDate(),
        },
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: today.subtract(4, 'month').toDate(),
            to: today.subtract(2, 'month').subtract(10, 'day').toDate(),
        },
    },
];

function StoryWrapper({ children, locale }: { children: ReactNode; locale: 'nb' | 'nn' }) {
    return (
        <IntlProvider locale={locale} messages={sifSoknadFormsMessages[locale]}>
            <Box style={{ minHeight: 700 }}>{children}</Box>
        </IntlProvider>
    );
}

function BostedUtlandDialogStory(props: StoryProps) {
    const [open, setOpen] = useState(true);

    return (
        <>
            {!open && (
                <button type="button" onClick={() => setOpen(true)}>
                    Åpne dialog
                </button>
            )}
            <BostedUtlandFormDialog
                isOpen={open}
                minDate={today.subtract(1, 'year').toDate()}
                maxDate={today.add(1, 'year').toDate()}
                bosted={props.bosted}
                alleBosteder={props.alleBosteder}
                onCancel={() => setOpen(false)}
                onValidSubmit={() => setOpen(false)}
            />
        </>
    );
}

const meta = {
    title: 'Dialogs/BostedUtland/Dialog',
    component: BostedUtlandDialogStory,
    decorators: [
        (Story, context) => {
            const locale = context.globals.locale === 'nn' ? 'nn' : 'nb';

            return (
                <StoryWrapper locale={locale}>
                    <Story />
                </StoryWrapper>
            );
        },
    ],
    args: {
        alleBosteder,
    },
} satisfies Meta<typeof BostedUtlandDialogStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NyttBosted: Story = {};

export const RedigerBosted: Story = {
    args: {
        bosted: alleBosteder[0],
        alleBosteder,
    },
};
