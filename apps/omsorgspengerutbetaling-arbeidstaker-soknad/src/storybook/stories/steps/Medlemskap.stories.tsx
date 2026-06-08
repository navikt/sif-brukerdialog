import { Meta, StoryFn } from '@storybook/react-vite';

import MedlemskapStep from '../../../app/søknad/steps/medlemskap/MedlemskapStep';
import { withAnalyticsProvider } from '../../decorators/withAnalyticsProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/MedlemskapStep',
    component: MedlemskapStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAnalyticsProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof MedlemskapStep>;

const Template: StoryFn<typeof MedlemskapStep> = () => <MedlemskapStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
