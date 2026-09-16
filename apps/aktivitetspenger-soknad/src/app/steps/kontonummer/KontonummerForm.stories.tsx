import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockRegistrerteBarn } from '@sif/api/mock-data';
import { HarKontonummerEnum } from '@sif/api/ung-deltaker';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { KontonummerForm } from './KontonummerForm';

const meta: Meta = {
    title: 'Søknad/Steg/Kontonummer',
    decorators: [withIntl, withRouter],
};

export default meta;

type Story = StoryObj;

export const MedKontonummer: Story = {
    render: () => <KontonummerForm />,
    decorators: [(Story) => withSøknadAppContext(Story)],
};

export const UtenKontonummer: Story = {
    render: () => <KontonummerForm />,
    decorators: [
        (Story) =>
            withSøknadAppContext(Story, {
                registrerteBarn: mockRegistrerteBarn,
                kontoInfo: { harKontonummer: HarKontonummerEnum.NEI },
            }),
    ],
};
