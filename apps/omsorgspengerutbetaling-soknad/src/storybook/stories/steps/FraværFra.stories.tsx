import { Meta, StoryFn } from '@storybook/react-vite';

import FraværFraStep from '../../../app/søknad/steps/fravær-fra/FraværFraStep';
import { withAnalyticsProvider } from '../../decorators/withAnalyticsProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/FraværFraStep',
    component: FraværFraStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAnalyticsProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof FraværFraStep>;

const Template: StoryFn<typeof FraværFraStep> = () => <FraværFraStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
