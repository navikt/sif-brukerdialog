import type { Meta, StoryObj } from '@storybook/react-vite';

import KontonummerSteg from './KontonummerSteg';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { withRouter } from '../../../../../storybook/decorators/withRouter';

const meta: Meta = {
    title: 'Søknad/Steg/Kontonummer',
    parameters: {},
    decorators: [
        withIntl,
        (Story) =>
            withSøknadContext(Story, {
                kontonummerInfo: { harKontonummer: true, kontonummerFraRegister: '112233445' },
            }),
        withRouter,
    ],
};

export default meta;

type Story = StoryObj;

export const Kontonummer: Story = {
    render: () => <KontonummerSteg />,
};
export const UtenKontonummer: Story = {
    render: () => <KontonummerSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                kontonummerInfo: { harKontonummer: false },
            }),
    ],
};
