import { YesOrNo } from '@sif/rhf';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { SøknadStepId } from '../../setup/config/SøknadStepId';
import { HarKontonummerEnum } from '../oppsummering/oppsummeringUtils';
import KontonummerSteg from './KontonummerSteg';

const kontonummerStepData = {
    harForståttRettigheterOgPlikter: true,
    kontonummer: { kontonummerErRiktig: YesOrNo.YES },
};

const meta: Meta = {
    title: 'Søknad/Steg/Kontonummer',
    parameters: {},
};

export default meta;

type Story = StoryObj;

export const Kontonummer: Story = {
    render: () => <KontonummerSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.KONTONUMMER,
                søknadsdata: kontonummerStepData,
            }),
    ],
};

export const UtenKontonummer: Story = {
    render: () => <KontonummerSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.KONTONUMMER,
                søknadsdata: kontonummerStepData,
                kontonummerInfo: { harKontonummer: HarKontonummerEnum.NEI },
            }),
    ],
};
