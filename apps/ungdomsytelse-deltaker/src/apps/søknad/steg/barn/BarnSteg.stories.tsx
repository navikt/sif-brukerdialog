import { YesOrNo } from '@sif/rhf';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { SøknadStepId } from '../../setup/config/SøknadStepId';
import BarnSteg from './BarnSteg';

const barnStepData = {
    harForståttRettigheterOgPlikter: true,
    kontonummer: { kontonummerErRiktig: YesOrNo.YES },
    barn: { barnStemmer: YesOrNo.YES },
};

const meta: Meta = {
    title: 'Søknad/Steg/Barn',
    parameters: {},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => <BarnSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.BARN,
                søknadsdata: barnStepData,
            }),
    ],
};

export const IngenBarn: Story = {
    render: () => <BarnSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.BARN,
                søknadsdata: barnStepData,
                barn: [],
            }),
    ],
};

export const EttBarn: Story = {
    render: () => <BarnSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.BARN,
                søknadsdata: barnStepData,
            }),
    ],
};

export const ToBarn: Story = {
    render: () => <BarnSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                currentStepId: SøknadStepId.BARN,
                søknadsdata: barnStepData,
                barn: [
                    { aktørId: '123', fornavn: 'SVAL', etternavn: 'FOTBALLBINGE', fødselsdato: new Date('2010-01-01') },
                    { aktørId: '456', fornavn: 'UNDERFUNDIG', etternavn: 'SKRUE', fødselsdato: new Date('2023-10-23') },
                ],
            }),
    ],
};
