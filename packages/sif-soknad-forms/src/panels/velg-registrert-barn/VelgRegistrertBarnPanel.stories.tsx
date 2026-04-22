import type { RegistrertBarn } from '@sif/api/k9-prosessering';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { withRHFForm } from '../../storybook/decorators/withRHFForm';
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

function StoryWrapper({ children }: { children: React.ReactNode }) {
    return <StoryFrame maxWidth={640}>{children}</StoryFrame>;
}

function VelgRegistrertBarnPanelStory(props: StoryProps) {
    return <VelgRegistrertBarnPanel<FormValues> name="barn" {...props} />;
}

const meta = {
    title: 'Panels/VelgRegistrertBarnPanel',
    component: VelgRegistrertBarnPanelStory,
    decorators: [
        withRHFForm,
        (Story) => {
            return (
                <StoryWrapper>
                    <Story />
                </StoryWrapper>
            );
        },
    ],
    parameters: {
        rhf: {
            defaultValues: {
                barn: registrerteBarn[0].aktørId,
            } satisfies FormValues,
        },
    },
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
        annetBarnLabel: 'Søknaden gjelder et barn som ikke er registrert på deg',
    },
};

export const IngenRegistrerteBarn: Story = {
    args: {
        registrerteBarn: [],
    },
};
