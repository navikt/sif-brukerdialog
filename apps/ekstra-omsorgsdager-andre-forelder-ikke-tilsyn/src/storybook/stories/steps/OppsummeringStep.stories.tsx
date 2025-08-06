import { Meta, StoryFn } from '@storybook/react-vite';
import Oppsummering from '../../../app/søknad/steps/oppsummering/OppsummeringStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { søknadsdataSykdom } from '../../mock-data/søknadsdata-sykdom';

export default {
    title: 'Steps/Oppsummering',
    component: Oppsummering,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        (Story) => withSøknadContextProvider(Story, { søknadsdata: søknadsdataSykdom }),
    ],
} as Meta<typeof Oppsummering>;

const Template: StoryFn<typeof Oppsummering> = () => <Oppsummering />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
