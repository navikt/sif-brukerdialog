import type { Meta, StoryObj } from '@storybook/react';
import IngenTilgangPage from '../../../app/pages/ingen-tilgang/IngenTilgangPage';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { søkerMock } from '../../data/søkerMock';
import { IngenTilgangÅrsak } from '../../../app/types/IngenTilgangÅrsak';

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
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet],
    },
};

export const ArbeidstidSomSelvstendigNæringsdrivende: Story = {
    name: 'harArbeidstidSomSelvstendigNæringsdrivende',
    args: {
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende],
    },
};

export const IngenPerioder: Story = {
    name: 'harIngenPerioder',
    args: {
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.harIngenPerioder],
    },
};

export const IngenSak: Story = {
    name: 'harIngenSak',
    args: {
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.harIngenSak],
    },
};

export const MerEnnEnSak: Story = {
    name: 'harMerEnnEnSak',
    args: {
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
    },
};
export const UgyldigK9FormatSak: Story = {
    name: 'harUgyldigK9FormatSak',
    args: {
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.harUgyldigK9FormatSak],
    },
};
export const SøknadsperioderUtenforTillattEndringsperiode: Story = {
    name: 'søknadsperioderUtenforTillattEndringsperiode',
    args: {
        søker: søkerMock,
        årsak: [IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode],
    },
};
