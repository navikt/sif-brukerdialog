import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import IngenTilgangPage from '../../../app/pages/ingen-tilgang/IngenTilgangPage';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { søkerMock } from '../../data/søkerMock';
import { IngenTilgangÅrsak } from '../../../app/types/IngenTilgangÅrsak';

export default {
    title: 'Pages/IngenTilgangPage',
    component: IngenTilgangPage,
    decorators: [withIntl, withRouterProvider],
    argTypes: {
        årsak: {
            options: Object.keys(IngenTilgangÅrsak),
        },
    },
} as ComponentMeta<typeof IngenTilgangPage>;

const Template: ComponentStory<typeof IngenTilgangPage> = (props) => <IngenTilgangPage {...props} søker={søkerMock} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
