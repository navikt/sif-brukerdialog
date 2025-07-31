import type { Meta, StoryObj } from '@storybook/react-vite';
import { registrerteBarnMock } from '../../../storybook/data/registrerteBarn.mock';
import { withFormikWrapper } from '../../../storybook/decorators/withFormikWrapper';
import { withIntl } from '../../../storybook/decorators/withIntl';
import VelgBarnFormPart from './VelgBarnFormPart';

const meta: Meta = {
    title: 'Form parts/Velg barn',
    parameters: {},
    decorators: [withFormikWrapper, withIntl],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => {
        return (
            <VelgBarnFormPart
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
            <VelgBarnFormPart
                inkluderAnnetBarn={true}
                name="barn"
                legend="Hvilket barn gjelder søknaden?"
                registrerteBarn={registrerteBarnMock}
            />
        );
    },
};
