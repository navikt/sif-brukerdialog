import { TilgjengeligSøknadType } from '@navikt/ung-brukerdialog-api';
import { mockSøker } from '@sif/api/mock-data';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { KanIkkeSøkePage } from './KanIkkeSøke';

const meta: Meta = {
    title: 'Søknad/Sider/Kan ikke søke',
    decorators: [withIntl, withRouter, (Story) => withSøknadAppContext(Story)],
};

export default meta;

type Story = StoryObj;

export const UbehandletFørstegangssøknad: Story = {
    render: () => (
        <KanIkkeSøkePage
            søker={mockSøker}
            tilgjengelig={{
                harInnsyn: false,
                harUbehandletSøknad: true,
                type: TilgjengeligSøknadType.INGEN,
            }}
        />
    ),
};

export const UbehandletAndregangssøknad: Story = {
    render: () => (
        <KanIkkeSøkePage
            søker={mockSøker}
            tilgjengelig={{
                harInnsyn: true,
                harUbehandletSøknad: false,
                type: TilgjengeligSøknadType.INGEN,
            }}
        />
    ),
};

export const NyPeriodeSøknad: Story = {
    render: () => (
        <KanIkkeSøkePage
            søker={mockSøker}
            tilgjengelig={{
                harInnsyn: true,
                harUbehandletSøknad: false,
                type: TilgjengeligSøknadType.NY_PERIODE_SØKNAD,
            }}
        />
    ),
};
