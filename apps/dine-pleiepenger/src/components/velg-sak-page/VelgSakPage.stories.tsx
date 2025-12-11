import type { Meta, StoryObj } from '@storybook/react-vite';

import mockMetadata from '../../../mock/data/to-saker/saker-metadata.json';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import { SakerMetadata } from '../../types';
import { sakerMetadataClientSchema } from '../../types/client-schemas/sakerMetadataClientSchema';
import VelgSakPage from './VelgSakPage';

const sakerMetadata: SakerMetadata[] = sakerMetadataClientSchema.array().parse(mockMetadata);

const meta: Meta<typeof VelgSakPage> = {
    component: VelgSakPage,
    title: 'Content/VelgSakPage',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof VelgSakPage>;

export const Default: Story = {
    name: 'Flere saker',
    args: {
        sakerMetadata: sakerMetadata,
    },
};
