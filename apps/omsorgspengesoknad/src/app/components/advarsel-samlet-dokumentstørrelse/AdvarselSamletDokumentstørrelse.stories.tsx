import { Meta, StoryFn } from '@storybook/react';
import AdvarselSamletDokumentstørrelse from './AdvarselSamletDokumentstørrelse';
import { withIntl } from '../../../storybook/decorators/withIntl';

export default {
    title: 'Components/AdvarselSamletDokumentstørrelse',
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
