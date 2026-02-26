import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadContext } from '../../../../storybook/decorators/withSøknadContext';
import { HarKontonummerEnum } from '../oppsummering/oppsummeringUtils';
import KontonummerSteg from './KontonummerSteg';

const meta: Meta = {
    title: 'Søknad/Steg/Kontonummer',
    parameters: {},
    decorators: [
        withIntl,
        (Story) =>
            withSøknadContext(Story, {
                kontonummerInfo: {
                    harKontonummer: HarKontonummerEnum.JA,
                    kontonummerFraRegister: '11112233333',
                    formatertKontonummer: '1111.22.33333',
                },
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
                kontonummerInfo: { harKontonummer: HarKontonummerEnum.NEI },
            }),
    ],
};
