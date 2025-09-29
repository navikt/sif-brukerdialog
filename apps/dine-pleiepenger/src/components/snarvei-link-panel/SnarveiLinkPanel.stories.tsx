import { Edit } from '@navikt/ds-icons';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import SnarveiLinkPanel from './SnarveiLinkPanel';

import type { Meta, StoryObj } from '@storybook/react-vite';
const meta: Meta<typeof SnarveiLinkPanel> = {
    component: SnarveiLinkPanel,
    title: 'Components/SnarveiLinkPanel',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof SnarveiLinkPanel>;

export const Default: Story = {
    args: {
        href: '#',
        title: 'Tittel på snarvei',
        description: <>Her kommer noe beskrivelse</>,
    },
};
export const MedIkon: Story = {
    name: 'Med ikon',
    args: {
        icon: <Edit role="presentation" width="1.25rem" height="1.25rem" />,
        href: '#',
        title: 'Tittel på snarvei',
        description: <>Her kommer noe beskrivelse</>,
    },
};
