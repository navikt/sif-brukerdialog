import { YesOrNo } from '@sif/rhf';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import { StoryFrame } from '../../storybook/components/StoryFrame';
import { Næringstype, type Virksomhet } from './index';
import { VirksomhetSummary } from './VirksomhetSummary';

const today = dayjs();

const pågåendeVirksomhet: Virksomhet = {
    id: 'virksomhet-pagaende',
    næringstype: Næringstype.FISKE,
    fiskerErPåBladB: YesOrNo.YES,
    navnPåVirksomheten: 'Havbris Fiske',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '999888777',
    fom: today.subtract(6, 'year').toDate(),
    erPågående: true,
    harRegnskapsfører: YesOrNo.YES,
    regnskapsfører_navn: 'Regnskapspartner AS',
    regnskapsfører_telefon: '93000000',
};

const nyoppstartetVirksomhet: Virksomhet = {
    id: 'virksomhet-nyoppstartet',
    næringstype: Næringstype.ANNEN,
    navnPåVirksomheten: 'Nordlys Design',
    registrertINorge: YesOrNo.NO,
    registrertILand: 'SE',
    fom: today.subtract(10, 'month').toDate(),
    erPågående: true,
    næringsinntekt: 420000,
    harRegnskapsfører: YesOrNo.NO,
};

const virksomhetMedVarigEndring: Virksomhet = {
    id: 'virksomhet-varig-endring',
    næringstype: Næringstype.JORDBRUK_SKOGBRUK,
    navnPåVirksomheten: 'Fjellgård Drift',
    registrertINorge: YesOrNo.YES,
    organisasjonsnummer: '123456789',
    fom: today.subtract(8, 'year').toDate(),
    tom: today.subtract(2, 'month').toDate(),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.YES,
    varigEndringINæringsinntekt_dato: today.subtract(14, 'month').toDate(),
    varigEndringINæringsinntekt_inntektEtterEndring: 360000,
    varigEndringINæringsinntekt_forklaring: 'Mindre drift etter omlegging av virksomheten.',
    harRegnskapsfører: YesOrNo.NO,
};

type StoryProps = {
    virksomhet: Virksomhet;
    harFlereVirksomheter?: boolean;
};

function VirksomhetSummaryStory(props: StoryProps) {
    return <VirksomhetSummary {...props} />;
}

const meta = {
    title: 'Dialogs/Virksomhet/Summary',
    component: VirksomhetSummaryStory,
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={400}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: {
        virksomhet: pågåendeVirksomhet,
    },
} satisfies Meta<typeof VirksomhetSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pågående: Story = {};

export const Nyoppstartet: Story = {
    args: {
        virksomhet: nyoppstartetVirksomhet,
        harFlereVirksomheter: true,
    },
};

export const MedVarigEndring: Story = {
    args: {
        virksomhet: virksomhetMedVarigEndring,
    },
};
