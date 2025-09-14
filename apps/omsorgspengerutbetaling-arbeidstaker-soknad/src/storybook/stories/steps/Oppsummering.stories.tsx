import { Meta, StoryFn } from '@storybook/react-vite';

import OppsummeringStep from '../../../app/søknad/steps/oppsummering/OppsummeringStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { søknadsdataMock } from '../../mock-data/søknadsdataMock';

export default {
    title: 'Steps/OppsummeringStep',
    component: OppsummeringStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        (Story) => withSøknadContextProvider(Story, { søknadsdata: søknadsdataMock }),
    ],
} as Meta<typeof OppsummeringStep>;

const Template: StoryFn<typeof OppsummeringStep> = () => <OppsummeringStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
