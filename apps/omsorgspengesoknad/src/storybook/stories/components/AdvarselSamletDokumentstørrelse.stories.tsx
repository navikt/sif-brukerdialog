import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import AdvarselSamletDokumentstørrelse from '../../../app/components/advarsel-samlet-dokumentstørrelse/AdvarselSamletDokumentstørrelse';
import { withIntl } from '../../decorators/withIntl';

export default {
    title: 'Component/AdvarselSamletDokumentstørrelse',
    component: AdvarselSamletDokumentstørrelse,
    decorators: [withIntl],
} as Meta<typeof AdvarselSamletDokumentstørrelse>;

const Template: StoryFn = () => (
    <div style={{ maxWidth: '50rem' }}>
        <AdvarselSamletDokumentstørrelse />
    </div>
);

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {};
