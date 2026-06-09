import { YesOrNo } from '@sif/rhf';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withQueryClient } from '../../../../../storybook/decorators/withQueryClient';
import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { SøknadStepId } from '../../setup/config/SøknadStepId';
import OppsummeringSteg from './OppsummeringSteg';

const oppsummeringStepData = {
    harForståttRettigheterOgPlikter: true,
    kontonummer: { kontonummerErRiktig: YesOrNo.YES },
    barn: { barnStemmer: YesOrNo.YES },
};

const meta: Meta = {
    title: 'Søknad/Steg/Oppsummering',
    parameters: {},
    decorators: [withQueryClient],
};

export default meta;

type Story = StoryObj;

export const Oppsummering: Story = {
    render: () => <OppsummeringSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.OPPSUMMERING,
                søknadsdata: oppsummeringStepData,
            }),
    ],
};
