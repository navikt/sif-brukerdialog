import { Box } from '@navikt/ds-react';
import { getDate1YearAgo, getDate1YearFromNow } from '@navikt/sif-common-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { sifSoknadFormsMessages } from '../../i18n';
import { BostedUtlandFormDialog } from './BostedUtlandDialog';
import type { BostedUtland } from './index';

type StoryProps = {
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
};

const alleBosteder: BostedUtland[] = [
    {
        id: '1',
        landkode: 'SWE',
        landnavn: 'Sverige',
        periode: {
            from: new Date('2024-01-01'),
            to: new Date('2024-03-31'),
        },
    },
    {
        id: '2',
        landkode: 'DNK',
        landnavn: 'Danmark',
        periode: {
            from: new Date('2024-05-01'),
            to: new Date('2024-06-15'),
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
                minDate={getDate1YearAgo()}
                maxDate={getDate1YearFromNow()}
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
