import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrerteBarnMock } from '../../../storybook/data/registrerteBarn.mock';
import { withIntlWrapper } from '../../../storybook/decorators/withIntlWrapper';
import VelgBarnInput from './VelgBarnInput';
import { withFormikWrapper } from '../../../storybook/decorators';

const meta: Meta = {
    title: 'Inputs/Velg barn input',
    parameters: {},
    decorators: [withFormikWrapper, withIntlWrapper],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => {
        return (
            <VelgBarnInput
                inkluderAnnetBarn={false}
                name="barn"
                legend="Hvilket barn gjelder søknaden?"
                registrerteBarn={registrerteBarnMock}
            />
        );
    },
};
export const MedAnnetBarn: Story = {
    render: () => {
        return (
            <VelgBarnInput
                inkluderAnnetBarn={true}
                name="barn"
                legend="Hvilket barn gjelder søknaden?"
                registrerteBarn={registrerteBarnMock}
            />
        );
    },
};
