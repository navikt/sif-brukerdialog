import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import IngenTilgangPage from '../../../app/pages/ingen-tilgang/IngenTilgangPage';
import { IngenTilgangÅrsak } from '../../../app/types/IngenTilgangÅrsak';
import { søkerMock } from '../../data/søkerMock';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';

export default {
    title: 'Pages/IngenTilgangPage',
    component: IngenTilgangPage,
    decorators: [withAmplitudeProvider, withIntl, withRouterProvider],
    argTypes: {
        årsak: {
            options: Object.keys(IngenTilgangÅrsak),
        },
    },
} as Meta<typeof IngenTilgangPage>;

const Template: StoryFn<typeof IngenTilgangPage> = (props) => <IngenTilgangPage {...props} søker={søkerMock} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
