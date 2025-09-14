import type { Meta, StoryObj } from '@storybook/react-vite';

import { registrerteBarnMock } from '../../../storybook/data/registrerteBarn.mock';
import { withIntlWrapper } from '../../../storybook/decorators/withIntlWrapper';
import RegistrerteBarnListe from './RegistrerteBarnListe';

const meta: Meta = {
    title: 'Components/Registrerte barn liste',
    parameters: {},
    decorators: [withIntlWrapper],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => {
        return <RegistrerteBarnListe registrerteBarn={registrerteBarnMock} />;
    },
};
