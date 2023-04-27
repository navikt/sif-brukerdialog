import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import IngenTilgangPage, { IngenTilgangPageProps } from '../../../app/pages/ingen-tilgang/IngenTilgangPage';
import { IngenTilgangÅrsak } from '../../../app/types/IngenTilgangÅrsak';
import { søkerMock } from '../../data/søkerMock';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';

const meta: Meta<typeof IngenTilgangPage> = {
    title: 'Pages/IngenTilgangPage',
    component: IngenTilgangPage,
    decorators: [withAmplitudeProvider, withIntl, withRouterProvider],
    argTypes: {
        årsak: {
            options: Object.keys(IngenTilgangÅrsak).map((årsak) => [årsak]),
            control: {
                type: 'select',
            },
            defaultValue: IngenTilgangÅrsak.harUgyldigK9FormatSak,
        },
    },
};

export default meta;

const Template: StoryFn<typeof IngenTilgangPage> = (props) => {
    const propsToUse: IngenTilgangPageProps = {
        ...props,
        // eslint-disable-next-line react/prop-types
        årsak: props.årsak,
    };
    return <IngenTilgangPage {...propsToUse} søker={søkerMock} />;
};

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
