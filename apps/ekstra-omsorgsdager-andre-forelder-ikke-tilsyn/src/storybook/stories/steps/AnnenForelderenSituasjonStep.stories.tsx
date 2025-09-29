import { Meta, StoryFn } from '@storybook/react-vite';

import AnnenForelderenSituasjonStep from '../../../app/søknad/steps/annen-forelderens-situasjon/AnnenForelderenSituasjonStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/AnnenForelderenSituasjonStep',
    component: AnnenForelderenSituasjonStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof AnnenForelderenSituasjonStep>;

const Template: StoryFn<typeof AnnenForelderenSituasjonStep> = () => <AnnenForelderenSituasjonStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
