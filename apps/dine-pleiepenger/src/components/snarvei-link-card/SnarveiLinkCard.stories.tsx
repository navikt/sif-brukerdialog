import { Edit } from '@navikt/ds-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import SnarveiLinkCard from './SnarveiLinkCard';
const meta: Meta<typeof SnarveiLinkCard> = {
    component: SnarveiLinkCard,
    title: 'Components/SnarveiLinkCard',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof SnarveiLinkCard>;

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
