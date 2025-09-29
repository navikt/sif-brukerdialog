import { Meta, StoryFn } from '@storybook/react-vite';

import DineBarnStep from '../../../app/søknad/steps/dine-barn/DineBarnStep';
import { withAmplitudeProvider } from '../../decorators/withAmplitudeProvider';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { withRouterProvider } from '../../decorators/withRouter';
import { withSøknadContextProvider } from '../../decorators/withSøknadContext';
import { withStepFormValuesContext } from '../../decorators/withStepFormValuesContext';

export default {
    title: 'Steps/DineBarnStep',
    component: DineBarnStep,
    decorators: [
        withIntl,
        withRouterProvider,
        withAmplitudeProvider,
        withStepFormValuesContext,
        withFormikWrapper,
        withSøknadContextProvider,
    ],
} as Meta<typeof DineBarnStep>;

const Template: StoryFn<typeof DineBarnStep> = () => <DineBarnStep />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
