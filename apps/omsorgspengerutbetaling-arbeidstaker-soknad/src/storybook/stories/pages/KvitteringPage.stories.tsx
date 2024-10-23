import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import KvitteringPage from '../../../app/pages/kvittering/KvitteringPage';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { kvitteringInfoStorybookMock, søkerStorybookMock } from '../../mock-data';

export default {
    title: 'Pages/KvitteringPage',
    component: KvitteringPage,
    decorators: [withIntl, withRouterProvider, withAmplitudeProvider],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn<typeof KvitteringPage> = () => (
    <KvitteringPage søker={søkerStorybookMock} kvitteringInfo={kvitteringInfoStorybookMock} />
);

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
