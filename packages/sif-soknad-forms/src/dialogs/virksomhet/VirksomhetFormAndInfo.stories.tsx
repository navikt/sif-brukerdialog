import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

import { YesOrNo } from '@sif/rhf';
import { SifSoknadFormsText } from '../../i18n';
import { StoryFrame } from '../../storybook/components/StoryFrame';
import { VirksomhetFormAndInfo } from './VirksomhetFormAndInfo';
import { Næringstype, type Virksomhet } from './index';

const today = dayjs();

const exampleVirksomhet: Virksomhet = {
    id: '1',
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'Min Konsulentfirma AS',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '999888777',
    fom: today.subtract(5, 'year').toDate(),
    erPågående: true,
    harRegnskapsfører: YesOrNo.NO,
};

type StoryProps = {
    virksomhet?: Virksomhet;
};

function VirksomhetFormAndInfoStory({ virksomhet: initialVirksomhet }: StoryProps) {
    const [virksomhet, setVirksomhet] = useState(initialVirksomhet);

    return (
        <VirksomhetFormAndInfo
            virksomhet={virksomhet}
            addButtonLabel={<SifSoknadFormsText id="@sifSoknadForms.virksomhet.dialog.leggTilKnapp" />}
            onChange={setVirksomhet}
        />
    );
}

const meta = {
    title: 'Dialogs/Virksomhet/FormAndInfo',
    component: VirksomhetFormAndInfoStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        virksomhet: exampleVirksomhet,
    },
} satisfies Meta<typeof VirksomhetFormAndInfoStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MedVirksomhet: Story = {};

export const UtenVirksomhet: Story = {
    args: {
        virksomhet: undefined,
    },
};
