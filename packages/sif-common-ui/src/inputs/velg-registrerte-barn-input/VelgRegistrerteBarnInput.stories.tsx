import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrerteBarnMock } from '../../../storybook/data/registrerteBarn.mock';
import { withIntlWrapper } from '../../../storybook/decorators/withIntlWrapper';
import VelgRegistrerteBarnInput from './VelgRegistrerteBarnInput';
import { withFormikWrapper } from '../../../storybook/decorators';

const meta: Meta = {
    title: 'Inputs/Registrerte barn input',
    parameters: {},
    decorators: [withFormikWrapper, withIntlWrapper],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => {
        return (
            <VelgRegistrerteBarnInput
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
            <VelgRegistrerteBarnInput
                inkluderAnnetBarn={true}
                name="barn"
                legend="Hvilket barn gjelder søknaden?"
                registrerteBarn={registrerteBarnMock}
            />
        );
    },
};
