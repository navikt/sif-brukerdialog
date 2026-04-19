import { Box } from '@navikt/ds-react';
import type { RegistrertBarn } from '@sif/api/k9-prosessering';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IntlProvider } from 'react-intl';

import { sifSoknadFormsMessages } from '../../i18n';
import { VelgRegistrertBarnPanel } from './VelgRegistrertBarnPanel';

type FormValues = {
    barn: string;
};

type StoryProps = {
    registrerteBarn: RegistrertBarn[];
    label?: string;
    inkluderAnnetBarn?: boolean;
    annetBarnLabel?: string;
};

const registrerteBarn: RegistrertBarn[] = [
    {
        aktørId: '123',
        fornavn: 'Ada',
        etternavn: 'Nordmann',
        mellomnavn: 'Marie',
        fødselsdato: new Date('2018-04-12'),
    },
    {
        aktørId: '456',
        fornavn: 'Oskar',
        etternavn: 'Nordmann',
        mellomnavn: undefined,
        fødselsdato: new Date('2020-09-03'),
    },
];

function StoryWrapper({ children, locale }: { children: ReactNode; locale: 'nb' | 'nn' }) {
    const methods = useForm<FormValues>({
        defaultValues: {
            barn: registrerteBarn[0].aktørId,
        },
    });

    return (
        <IntlProvider locale={locale} messages={sifSoknadFormsMessages[locale]}>
            <FormProvider {...methods}>
                <Box style={{ maxWidth: 640 }}>{children}</Box>
            </FormProvider>
        </IntlProvider>
    );
}

function VelgRegistrertBarnPanelStory(props: StoryProps) {
    return <VelgRegistrertBarnPanel<FormValues> name="barn" {...props} />;
}

const meta = {
    title: 'Panels/VelgRegistrertBarnPanel',
    component: VelgRegistrertBarnPanelStory,
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
        registrerteBarn,
    },
} satisfies Meta<typeof VelgRegistrertBarnPanelStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const MedAnnetBarn: Story = {
    args: {
        inkluderAnnetBarn: true,
        annetBarnLabel: 'Soknaden gjelder et barn som ikke er registrert pa deg',
    },
};

export const IngenRegistrerteBarn: Story = {
    args: {
        registrerteBarn: [],
    },
};