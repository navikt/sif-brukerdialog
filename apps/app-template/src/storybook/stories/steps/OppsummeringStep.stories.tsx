import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import OppsummeringStep from '../../../app/søknad/steps/oppsummering/OppsummeringStep';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';

export default {
    title: 'Steps/OppsummeringStep',
    component: OppsummeringStep,
    decorators: [
        withIntl,
        withRouterProvider,
        (story) =>
            withSøknadContextProvider(story, {
                søknadsdata: {
                    harBekreftetOpplysninger: false,
                    harForståttRettigheterOgPlikter: true,
                    id: '123',
                    pleietrengende: {
                        navn: 'Navn',
                        alder: 10,
                    },
                },
            }),
        withFormikWrapper,
    ],
} as ComponentMeta<typeof OppsummeringStep>;

const Template: ComponentStory<typeof OppsummeringStep> = () => <OppsummeringStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
    formik: {},
};
