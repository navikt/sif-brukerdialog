import { Meta, StoryObj } from '@storybook/react-vite';

import MessagesPreview, {
    MessagesPreviewProps,
} from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { appMessages as omsIkkeTilsyn } from '../../../ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/src/app/i18n';
import { appMessages as omsAleneomsorg } from '../../../omsorgsdager-aleneomsorg-dialog/src/app/i18n';
import { appMessages as omsArbeidstaker } from '../../../omsorgspengerutbetaling-arbeidstaker-soknad/src/app/i18n';
import { appMessages as omsSnFri } from '../../../omsorgspengerutbetaling-soknad/src/app/i18n';
import { appMessages as omsKronisk } from '../../../omsorgspengesoknad/src/app/i18n';
import { appMessages as pils } from '../../../pleiepenger-i-livets-sluttfase-soknad/src/app/i18n';
import { appMessages as psb } from '../../../pleiepenger-sykt-barn/src/app/i18n';
import { appMessages as opplaringspenger } from '../../../opplaringspenger-soknad/src/app/i18n/appMessages';
import { appMessages as ettersendelse } from '../../../sif-ettersending/src/app/i18n';
import { applicationIntlMessages as ungDeltaker } from '../../../ungdomsytelse-deltaker/src/i18n';

const meta: Meta<MessagesPreviewProps> = {
    title: 'Applikasjoner',
    component: MessagesPreview,
    args: {
        showExplanation: false,
        showMissingTextSummary: true,
    },
};
export default meta;

type Story = StoryObj<MessagesPreviewProps>;

export const OmsIkkeTilsyn: Story = {
    name: 'Ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn',
    args: {
        messages: omsIkkeTilsyn,
    },
};

export const OmsAleneomsorg: Story = {
    name: 'Søknad om ekstra omsorgsdager ved aleneomsorg',
    args: {
        messages: omsAleneomsorg,
    },
};

export const OmsArbeidstaker: Story = {
    name: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
    args: {
        messages: omsArbeidstaker,
    },
};

export const OmsSnFri: Story = {
    name: 'Søknad om utbetaling av omsorgspenger til selvstendig næringsdrivende eller frilansere',
    args: {
        messages: omsSnFri,
    },
};

export const OmsKronisk: Story = {
    name: 'Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    args: {
        messages: omsKronisk,
    },
};

export const Pils: Story = {
    name: 'Søknad om pleiepenger i livets sluttfase',
    args: {
        messages: pils,
    },
};
export const PSB: Story = {
    name: 'Søknad om pleiepenger for sykt barn',
    args: {
        messages: psb,
    },
};

export const Ettersendelse: Story = {
    name: 'Ettersending av dokumenter innenfor sykdom i familien',
    args: {
        messages: ettersendelse,
    },
};

export const Opplæringspenger: Story = {
    name: 'Søknad om opplæringspenger',
    args: {
        messages: opplaringspenger,
    },
};

export const UngdomsprogramytelseDeltaker: Story = {
    name: 'Ungdomsprogramytelse - Deltaker',
    args: {
        messages: ungDeltaker,
    },
};
