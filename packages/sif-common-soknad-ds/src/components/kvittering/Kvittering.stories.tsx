import { Meta, StoryObj } from '@storybook/react';
import Kvittering from './Kvittering';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';

const meta: Meta<typeof Kvittering> = {
    component: Kvittering,
    title: 'Component/Kvittering',
    decorators: [withPageWidth],
};

export default meta;

type Story = StoryObj<typeof Kvittering>;

export const Default: Story = {
    name: 'Default',
    render: () => (
        <Kvittering tittel="Søknad mottatt" liste={{ tittel: 'ABC', punkter: ['Punkt 1', 'Punkt 2'] }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, molestias! Assumenda error porro cum culpa
            fugiat qui mollitia aperiam veniam et, atque aliquid, rerum numquam praesentium voluptates unde quia
            nesciunt.
        </Kvittering>
    ),
};
