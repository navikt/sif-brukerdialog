import { Meta, StoryFn } from '@storybook/react-vite';

import ArbeidssituasjonStep from '../../../app/søknad/steps/arbeidssituasjon/ArbeidssituasjonStep';
import { withAnalyticsProvider } from '../../decorators/withAnalyticsProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/ArbeidssituasjonStep',
    component: ArbeidssituasjonStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAnalyticsProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof ArbeidssituasjonStep>;

const Template: StoryFn<typeof ArbeidssituasjonStep> = () => <ArbeidssituasjonStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
