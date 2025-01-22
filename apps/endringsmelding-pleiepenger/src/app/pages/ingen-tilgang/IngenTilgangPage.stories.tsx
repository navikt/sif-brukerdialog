import type { Meta, StoryObj } from '@storybook/react';
import { getScenarioMockData } from '../../../mocks/data/scenario';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitudeProvider';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withRouterProvider } from '../../../storybook/decorators/withRouter';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import IngenTilgangPage from './IngenTilgangPage';

const { søker } = getScenarioMockData('en-arbeidsgiver-en-periode');

const meta: Meta<typeof IngenTilgangPage> = {
    title: 'Pages/IngenTilgangPage',
    component: IngenTilgangPage,
    decorators: [withAmplitudeProvider, withIntl, withRouterProvider],
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof IngenTilgangPage>;

export const Default: Story = {
    name: 'harArbeidsgiverUtenArbeidsaktivitet',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet],
    },
};

export const ArbeidstidSomSelvstendigNæringsdrivende: Story = {
    name: 'harArbeidstidSomSelvstendigNæringsdrivende',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende],
    },
};

export const IngenPerioder: Story = {
    name: 'harIngenPerioder',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.harIngenPerioder],
    },
};

export const IngenSak: Story = {
    name: 'harIngenSak',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.harIngenSak],
    },
};

export const EnArbeidsgiverToAnsettelserSammeUkeMedOpphold: Story = {
    name: 'enArbeidsgiverToAnsettelserSammeUkeMedOpphold',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.enArbeidsgiverToAnsettelserSammeUkeMedOpphold],
    },
};

export const MerEnnEnSak: Story = {
    name: 'harMerEnnEnSak',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
    },
};
export const UgyldigK9FormatSak: Story = {
    name: 'harUgyldigK9FormatSak',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.harUgyldigK9FormatSak],
    },
};
export const SøknadsperioderUtenforTillattEndringsperiode: Story = {
    name: 'søknadsperioderUtenforTillattEndringsperiode',
    args: {
        søker,
        årsak: [IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode],
    },
};
